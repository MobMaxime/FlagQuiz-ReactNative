import globals from '../configs/globals';
import colors from '../configs/colors'

const styles={};

styles.bgImageStyle={
    width:'100%',
    height:'100%',
}
styles.modalContainer={
    backgroundColor:'#FFFF',
    padding: 10,
    marginHorizontal:10,
    borderRadius: 10,  
}
styles.titleTextStyle={
    fontFamily:globals.FONT_Bold,
    fontSize:40,
    padding:10,
}
styles.contentView={
    marginTop:50,
    marginBottom:30
}
styles.buttonText={
    color:colors.ThemFontColor,
    fontFamily:globals.FONT_Bold,
    fontSize:30,
}
styles.flagImageStyle={
    width:280,
    height:200,
}
styles.bottomView={
    width: '100%', 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  }
export default styles;
