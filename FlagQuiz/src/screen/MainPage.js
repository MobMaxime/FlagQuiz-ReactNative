import React,{Component} from 'react';
import {Platform,View,Text,StyleSheet,TouchableOpacity,ImageBackground,StatusBar,BackAndroid} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import Modal from "react-native-modal";
import { Share } from 'react-native';
import {Content, Container} from 'native-base';
import allStyles from './styles';

const {bgImageStyle,modalContainer,titleTextStyle,contentView,buttonText} = allStyles;
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
          fontWeight: undefined,
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
    exitApp = ()=>{
        if(Platform.OS === 'android')
            BackAndroid.exitApp();
    }
    renderLevelPopUp = () => (
        <View style={modalContainer} >  
            <Text style={titleTextStyle} >{strings.txt_level}</Text>                          
            <Text style={styles.textStyle} onPress={()=>{globals.currentLevel=1,this.toggleLevelModal()}}>{strings.txt_easy}</Text>
            <Text style={styles.textStyle} onPress={()=>{globals.currentLevel=2,this.toggleLevelModal()}}>{strings.txt_medium}</Text>
            <Text style={[styles.textStyle]} onPress={()=>{globals.currentLevel=3,this.toggleLevelModal()}}>{strings.txt_deficult}</Text>
        </View>
      );
    renderAboutPopUp = () => (
        <View style={modalContainer} >  
            <Text style={titleTextStyle} >{strings.txt_about_us}</Text>     
            <Text style={styles.textStyle} >{globals.aboutUs}</Text> 
            <Text style={[styles.textStyle,{alignSelf:'center'}]} onPress={()=>this.setState({ isAboutUsVisible: !this.state.isAboutUsVisible })}>{strings.txt_ok}</Text>                       
        </View>
      );
    render(){        
        const AppStatusBar = () => (<StatusBar backgroundColor={colors.ButtonBgColor} translucent={false} barStyle="light-content" />);
        return(
            <ImageBackground source={bgImage} style={bgImageStyle}>
                <AppStatusBar/>
                    <Content contentContainerStyle={styles.buttonContainer}>
                        <View style={contentView}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} onPress={()=>this.props.navigation.navigate('FlagQuiz')} > 
                                <Text style={buttonText}>{strings.btn_start}</Text>
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

                            <TouchableOpacity activeOpacity={0.8}  style={styles.buttonStyle} onPress={()=>this.setState({ isModalVisible: !this.state.isModalVisible })}> 
                                <Text style={buttonText}>{strings.btn_level}</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity activeOpacity={0.8}  style={styles.buttonStyle} onPress={()=>this.setState({ isAboutUsVisible: !this.state.isAboutUsVisible })}> 
                                <Text style={buttonText}>{strings.btn_about_us}</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity activeOpacity={0.8}  style={styles.buttonStyle} onPress={()=>this.shareApp()}> 
                                <Text style={buttonText}>{strings.btn_share}</Text>
                            </TouchableOpacity>  
                            {/* <TouchableOpacity activeOpacity={0.8}  style={styles.buttonStyle} > 
                                <Text style={buttonText}>{strings.btn_exit}</Text>
                            </TouchableOpacity>   */}
                        </View>
                        
                    </Content> 
            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({

    buttonContainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    buttonStyle:{
        marginTop:15,
        backgroundColor:colors.ButtonBgColor,
        alignItems:'center',
        justifyContent:'center',
        width:300,
        height:50,
        borderRadius:25,
        
    },
    textStyle:{
        fontFamily:globals.FONT_Bold,
        fontSize:30,
        marginLeft:20,
        padding:10,
    },
});