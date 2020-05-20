
import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDQsNBpr5zjXH2259SHHoJqmC_oulJxsUY",
    authDomain: "usuariolinkcode.firebaseapp.com",
    databaseURL: "https://usuariolinkcode.firebaseio.com",
    projectId: "usuariolinkcode",
    storageBucket: "usuariolinkcode.appspot.com",
    messagingSenderId: "80889249698",
    appId: "1:80889249698:web:37e23177ce1f6237bdfcfb",
    measurementId: "G-N2MDK2SN4N"
  };

class Firebase {

    constructor(){
        app.initializeApp(firebaseConfig)
        this.db = app.firestore()
        this.auth = app.auth()
        this.storage = app.storage()
    }

estaIniciado() {
    return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
    })
}

guardarDocumento = (nombreDocumento, documento ) => this.storage.ref().child(nombreDocumento).put(documento)


devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL()

}

export default Firebase