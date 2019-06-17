import {Platform} from 'react-native';
class Globals{
    
    static FONT_Bold = Platform.OS === 'ios' ? 'AmaticSC-Bold' : 'AmaticSCBold';
    static currentLevel=1;

    static options1=['Option1','Option2','Option3'];
    static options2=['Option1','Option2','Option3','Option4','Option5','Option6'];
    static options3=['Option1','Option2','Option3','Option4','Option5','Option6','Option7','Option8','Option9'];
    
}
module.exports = Globals;