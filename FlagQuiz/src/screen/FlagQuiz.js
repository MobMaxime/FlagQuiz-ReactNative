import React,{Component} from 'react';
import {View,Button,Text,StyleSheet,TouchableHighlight,ImageBackground,FlatList,Alert,Animated,Easing} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import { FlatGrid } from 'react-native-super-grid';
import {Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10} from '../configs/images';
import {Image} from 'react-native-animatable';

export default class FlagQuiz extends Component{
    
    constructor(props){
        super(props);
        this.state={
            Qno:1,
            totalQ:10,
            data:[],
            isSelect:false,
            response:'',
            resColor:'',
            imgFlag:[Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10],
            isAnswered:true,
            FlagData:globals.shuffleArray(globals.FlagsSource,globals.currentLevel),
            CorrectFlag: globals.correctFlag(globals.currentLevel),
            animationRef:null,
        }
        this.state.imgFlag.sort(() => 0.5 - Math.random());
        
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
    handleAnimation = () => {
        Animated.timing(this.animatedValue, {toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true}).start(); 
        //   setTimeout(() => {
        //     Animated.loop.stop();
        // }, 1000);
      }
    checkFlag=(value)=>
    {
        if(this.state.FlagData[this.state.CorrectFlag].answer==value)
        {
            this.setState({isSelect:true,response:'Correct',resColor:'green'});
            setTimeout(() => {
                this.setFlag();
            }, 1000);
            
        }   
        else
        {
            this.setState({isSelect:true,response:'InCorrect',resColor:'red'});
            this.state.animationRef.shake();
        }             
    }
    setFlag=()=>
    {
        this.setState({
            Qno: this.state.Qno+1,
            FlagData:globals.shuffleArray(globals.FlagsSource,globals.currentLevel),
            CorrectFlag: globals.correctFlag(globals.currentLevel),
            isSelect:false,
        });
    }

    render(){
        
        const {Qno} = this.state;
        const {totalQ} = this.state;
        const {imgFlag} = this.state;
        const {FlagData} = this.state;
        const {CorrectFlag}= this.state;
        if(Qno>totalQ)
        {
            alert('Quiz Finished....');
            this.props.navigation.goBack();
        }
        //let imgPath = require('../../assets/images/map/' + Qno + '.png');
        return(
            <ImageBackground source={bgImage} style={styles.bgImageStyle}>
                <View style={styles.Container}>
                    <Text style={styles.textStyle}>{strings.txt_question} {Qno} {'Of'} {totalQ}</Text>
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
});