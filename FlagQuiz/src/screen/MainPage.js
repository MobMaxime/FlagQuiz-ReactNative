import React,{Component} from 'react';
import {View,Button,Text,StyleSheet,TouchableOpacity,ImageBackground,Modal,TouchableHighlight} from 'react-native';
import colors from '../configs/colors'
import bgImage from '../../assets/images/background.jpg'
import strings from '../configs/strings';
import globals from '../configs/globals';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

export default class MainPage extends Component{

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
    state={
        modalVisible:false,
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    render(){
        return(
            <ImageBackground source={bgImage} style={styles.bgImageStyle}>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>this.props.navigation.navigate('FlagQuiz')} > 
                        <Text style={styles.buttonText}>{strings.btn_start}</Text>
                    </TouchableOpacity> 

                    <Menu style={{alignItems:'center',justifyContent:'center',borderRadius:20}} >
                        <MenuTrigger>
                            <View style={styles.buttonStyle}> 
                                <Text style={styles.buttonText}>{strings.btn_level}</Text>
                            </View>  
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption  text='Easy' onSelect={()=>globals.currentLevel=1} />
                            <MenuOption text='Medium' onSelect={()=>globals.currentLevel=2} />
                            <MenuOption text='Dificult' onSelect={()=>globals.currentLevel=3}  />
                        </MenuOptions>
                    </Menu>

                    {/* <TouchableOpacity style={styles.buttonStyle}> 
                        <Text style={styles.buttonText}>{strings.btn_level}</Text>
                    </TouchableOpacity>   */}
                    <TouchableOpacity style={styles.buttonStyle}> 
                        <Text style={styles.buttonText}>{strings.btn_about_us}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.buttonStyle}> 
                        <Text style={styles.buttonText}>{strings.btn_rate_us}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.buttonStyle}> 
                        <Text style={styles.buttonText}>{strings.btn_share}</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.buttonStyle}> 
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
    }
});

{/* <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal> */}