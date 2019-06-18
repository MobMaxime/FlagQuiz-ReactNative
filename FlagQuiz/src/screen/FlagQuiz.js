import React,{Component} from 'react';
import {Image,View,Button,Text,StyleSheet,TouchableHighlight,ImageBackground,FlatList,Alert} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import { FlatGrid } from 'react-native-super-grid';
import {Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10} from '../configs/images';


export default class FlagQuiz extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            Qno:1,
            totalQ:10,
            data:[],
            imgFlag:[Flag1,Flag2,Flag3,Flag4,Flag5,Flag6,Flag7,Flag8,Flag9,Flag10],
            isAnswered:true,
            FlagData:globals.shuffleArray(globals.FlagsSource,globals.currentLevel),
            CorrectFlag: globals.correctFlag(globals.currentLevel)
        }
        this.state.imgFlag.sort(() => 0.5 - Math.random());
        
        this.getOptions();
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
    getOptions=()=>{
        let level = globals.currentLevel;
        if(level==1)
            this.state.data=globals.options1;
        else if(level==2)
            this.state.data=globals.options2;
        else if(level==3)
            this.state.data=globals.options3.sort(() => 0.5 - Math.random());
    }
    render(){
        
        const {data} = this.state;
        const {Qno} = this.state;
        const {totalQ} = this.state;
        const {imgFlag} = this.state;
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
                    <Image style={styles.imageStyle} source={this.state.FlagData[this.state.CorrectFlag-1].source}/>
                    <Text style={styles.textStyle}>{strings.txt_instruction}</Text>
                    <View>
                        <FlatGrid
                            itemDimension={100}
                            items={this.state.FlagData}
                            renderItem={({ item, index }) => (
                                <TouchableHighlight style={styles.buttonContainer} onPress={()=>this.setState({Qno: Qno+1})}> 
                                    <Text style={styles.buttonText}>{item.answer}</Text>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                    <View style={{position:'absolute',bottom:0}}>
                        <Text style={styles.textStyle}>Status</Text>               
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
        width:200,
        height:150,
    },
    buttonContainer: {
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
        backgroundColor:colors.ButtonBgColor 
      },
});