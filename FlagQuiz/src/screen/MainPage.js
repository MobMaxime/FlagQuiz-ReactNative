import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ImageBackground,StatusBar} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import Modal from "react-native-modal";
import { Share } from 'react-native';

export default class MainPage extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            isModalVisible:false,
            isAboutUsVisible:false,
        }
    }
    static navigationOptions = {
        title:strings.txt_main_title,
        
        headerStyle:{
            backgroundColor:colors.ThemeBgColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily:globals.FONT_Bold,
          fontSize:30,
        },
        headerTintColor:colors.ThemFontColor,

    } 
    toggleLevelModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    shareApp=()=>{
        Share.share({
            message: 'Try this For Learn React-Native',
            url: 'https://github.com/MobMaxime/FlagQuiz-ReactNative',
            title: 'FlagQuiz'
          }, {
            // Android only:
            dialogTitle: 'Share FlagQuiz',
            // iOS only:
            excludedActivityTypes: [
              'com.apple.UIKit.activity.PostToTwitter'
            ]
          })
    }
    renderLevelPopUp = () => (
        <View style={styles.modalContainer} >  
            <Text style={styles.titleTextStyle} >{strings.txt_level}</Text>                          
            <Text style={styles.textStyle} onPress={()=>{globals.currentLevel=1,this.toggleLevelModal()}}>{strings.txt_easy}</Text>
            <Text style={styles.textStyle} onPress={()=>{globals.currentLevel=2,this.toggleLevelModal()}}>{strings.txt_medium}</Text>
            <Text style={[styles.textStyle]} onPress={()=>{globals.currentLevel=3,this.toggleLevelModal()}}>{strings.txt_deficult}</Text>
        </View>
      );
    renderAboutPopUp = () => (
        <View style={styles.modalContainer} >  
            <Text style={styles.titleTextStyle} >{strings.txt_about_us}</Text>     
            <Text style={styles.textStyle} >{globals.aboutUs}</Text> 
            <Text style={[styles.textStyle,{alignSelf:'center'}]} onPress={()=>this.setState({ isAboutUsVisible: !this.state.isAboutUsVisible })}>{strings.txt_ok}</Text>                       
        </View>
      );
    render(){
        const AppStatusBar = () => (<StatusBar backgroundColor={colors.ButtonBgColor} translucent={false} barStyle="light-content" />);
        return(
            <ImageBackground source={bgImage} style={styles.bgImageStyle}>
                <AppStatusBar/>
                <View style={styles.buttonContainer} >

                    <TouchableOpacity activeOpacity={true} style={styles.buttonStyle} onPress={()=>this.props.navigation.navigate('FlagQuiz')} > 
                        <Text style={styles.buttonText}>{strings.btn_start}</Text>
                    </TouchableOpacity> 
                    <Modal 
                        onBackdropPress={()=>this.toggleLevelModal()}
                        transparent={true} 
                        isVisible={this.state.isModalVisible} >                        
                        {this.renderLevelPopUp()}
                    </Modal>

                    <Modal 
                        onBackdropPress={()=>this.setState({ isAboutUsVisible: !this.state.isAboutUsVisible })}
                        transparent={true} 
                        isVisible={this.state.isAboutUsVisible} >                        
                        {this.renderAboutPopUp()}
                    </Modal>

                    <TouchableOpacity activeOpacity={true}  style={styles.buttonStyle} onPress={()=>this.setState({ isModalVisible: !this.state.isModalVisible })}> 
                        <Text style={styles.buttonText}>{strings.btn_level}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity activeOpacity={true}  style={styles.buttonStyle} onPress={()=>this.setState({ isAboutUsVisible: !this.state.isAboutUsVisible })}> 
                        <Text style={styles.buttonText}>{strings.btn_about_us}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity activeOpacity={true}  style={styles.buttonStyle} onPress={()=>this.shareApp()}> 
                        <Text style={styles.buttonText}>{strings.btn_share}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity activeOpacity={true}  style={styles.buttonStyle}> 
                        <Text style={styles.buttonText}>{strings.btn_exit}</Text>
                    </TouchableOpacity>  
                </View>

            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    bgImageStyle:{
        width:'100%',
        height:'100%',
    },
    buttonContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonStyle:{
        marginTop:10,
        backgroundColor:colors.ButtonBgColor,
        alignItems:'center',
        justifyContent:'center',
        width:250,
        height:50,
        borderRadius:25,
        
    },
    buttonText:{
        color:colors.ThemFontColor,
        fontFamily:globals.FONT_Bold,
        fontSize:30,
    },
    textStyle:{
        fontFamily:globals.FONT_Bold,
        fontSize:30,
        marginLeft:20,
        padding:10,
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
    },
});