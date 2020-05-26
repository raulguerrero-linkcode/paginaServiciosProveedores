
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
        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos) {
            var ref=this
            // Promesa para esperar a que todos los documentos se guarden y devuelva la ruta
            // Pasar un arreglo de fotos y la función regresará un arreglo de URLS
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot => {
                    return ref.child(file.alias).getDownloadURL()
                })
            }))
        }
    }

estaIniciado() {
    return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
    })
}

guardarDocumento = (nombreDocumento, documento ) => this.storage.ref().child(nombreDocumento).put(documento)


devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL()

guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos)

}

export default Firebase