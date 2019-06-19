import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableHighlight,ImageBackground} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import { FlatGrid } from 'react-native-super-grid';
import {Image} from 'react-native-animatable';
import Modal from "react-native-modal";

export default class FlagQuiz extends Component{
    
    constructor(props){
        super(props);
        this.correct=0;
        this.incorrect=0;
        this.guesses=0;
        this.accuracy=0;
        this.state={
            Qno:1,
            totalQ:10,        
            data:[],
            isSelect:false,
            response:'',
            resColor:'',
            isAnswered:true,
            FlagData:globals.shuffleArray(globals.FlagsSource,globals.currentLevel),
            CorrectFlag: globals.correctFlag(globals.currentLevel),
            animationRef:null,
            isShowResult:false
        }
        
        //this.getOptions();
    }
    static navigationOptions =({navigation})=>{
        const { params ={}} = navigation.state;

        return{
            title:strings.txt_game_title,
            headerStyle:{
                backgroundColor:colors.ThemeBgColor,
            },
            headerTitleStyle: {
                fontFamily:globals.FONT_Bold,
                fontSize:30,
              },
            headerTintColor:colors.ThemFontColor,
            //headerLeft:null,
        }
    }
    
    componentDidMount()
    {
        
    }
    componentWillMount(){
        
    }
    checkFlag=(value)=>
    {
                if(this.state.FlagData[this.state.CorrectFlag].answer==value)
                {
                    this.setState({isSelect:true,response:'Correct',resColor:'green'});
                    setTimeout(() => {
                        this.setFlag();
                    }, 500);
                    this.correct=this.correct+1;
                }   
                else
                {
                    this.setState({isSelect:true,response:'InCorrect',resColor:'red'});
                    this.state.animationRef.shake();
                    this.incorrect=this.incorrect+1;
                } 
                   
    }
    setFlag=()=>
    {
            if(this.state.Qno>=this.state.totalQ)
            {
                this.displayResult();
                //this.props.navigation.goBack();
            } 
            else
            {
                this.setState({
                    Qno: this.state.Qno+1,
                    FlagData:globals.shuffleArray(globals.FlagsSource,globals.currentLevel),
                    CorrectFlag: globals.correctFlag(globals.currentLevel),
                    isSelect:false,
                });
            }
       
    }
    displayResult()
    {
        this.guesses = this.correct + this.incorrect;
        this.accuracy = ((this.correct/this.guesses) * 100).toFixed(2) ;
        this.setState({
            isShowResult:true
        });
    }
    renderResultPopUp = () => (
        <View style={styles.modalContainer} >  
            <Text style={styles.titleTextStyle} >{strings.txt_quiz_over}</Text>     
            <Text style={styles.textStyle} >{`You made ${this.guesses} guesses. \nAccuracy - ${this.accuracy} %\n\nThank you for Playing :)`}</Text> 
            <Text style={[styles.textStyle,{alignSelf:'center'}]} onPress={()=>{this.setState({ isShowResult: !this.state.isShowResult }); this.props.navigation.goBack();} }>{strings.txt_ok}</Text>                       
        </View>
      );
    render(){
        
        const {Qno} = this.state;
        const {totalQ} = this.state;
        const {FlagData} = this.state;
        const {CorrectFlag}= this.state;
        
        return(
            <ImageBackground source={bgImage} style={styles.bgImageStyle}>
                <View style={styles.Container}>
                    <Text style={styles.textStyle}>{strings.txt_question} {Qno} {strings.txt_of} {totalQ}</Text>
                    <Image style={styles.imageStyle} ref={ref=>(this.state.animationRef=ref)}  duration={2000} source={FlagData[CorrectFlag].source}/>
                    <Text style={styles.textStyle}>{strings.txt_instruction}</Text>
                    <View style={{height:200}}>
                        <FlatGrid
                            itemDimension={100}
                            items={FlagData}
                            renderItem={({ item, index }) => (
                                <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.checkFlag(item.answer)}> 
                                    <Text style={styles.buttonText}>{item.answer}</Text>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                    <View style={styles.bottomView}>
                            {(this.state.isSelect) && <Text style={{fontFamily:globals.FONT_Bold,fontSize:30,color:this.state.resColor}}>
                                                        {this.state.response}</Text> }  
                    </View>  
                </View>
                <Modal 
                    onBackdropPress={()=>this.setState({ isShowResult: !this.state.isShowResult })}
                    transparent={true} 
                    isVisible={this.state.isShowResult} >                        
                    {this.renderResultPopUp()}
                </Modal>   
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        top:50,
    },
    bgImageStyle:{
        width:'100%',
        height:'100%',
    },
    buttonStyle:{
        marginTop:10,
        backgroundColor:colors.ButtonBgColor,
        alignItems:'center',
        justifyContent:'center',
        width:250,
        height:50,
        borderRadius:10,
        
    },
    textStyle:{
        fontFamily:globals.FONT_Bold,
        fontSize:30,
    },
    buttonText:{
        fontFamily:globals.FONT_Bold,
        fontSize:30,
        color:colors.ThemFontColor,
    },
    imageStyle:{
        width:280,
        height:200,
    },
    buttonContainer: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
        backgroundColor:colors.ButtonBgColor 
      },
    bottomView:{
        width: '100%', 
        height: 50, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
      },
      titleTextStyle:{
        fontFamily:globals.FONT_Bold,
        fontSize:40,
        padding:10,
    },
    modalContainer:{
        backgroundColor:'#FFFF',
        padding: 10,
        marginHorizontal:10,
        borderRadius: 10,  
    }
});