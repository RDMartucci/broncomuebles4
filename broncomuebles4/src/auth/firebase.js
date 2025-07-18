import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAPdlOxioERkUZy7eCXIVYPOa-ZFdjoyPM",
    authDomain: "prueba-auth01.firebaseapp.com",
    projectId: "prueba-auth01",
    storageBucket: "prueba-auth01.appspot.com",
    messagingSenderId: "480275176886",
    appId: "1:480275176886:web:ebcca7e48a80bedb78b517",
    measurementId: "G-Q5K183MTV4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Instancia de Auth
export const auth = getAuth(app);

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("firebase->Crea user email&pass-> Credenciales aceptadas:", userCredential);
                console.log("firebase->Crea user email&pass-> usuario:", userCredential.user, ' email:',userCredential.email);
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}


    export function loginEmailPass(email, password){
        return(
            new Promise((res, rej) => {
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    
                    console.log("firebase->loguea email&pass-> usuario:", userCredential.user, ' email:',userCredential.email);
                    const user = userCredential.user;
                    console.log(user)
                    res(user)
                })
                .catch((error) => {
                    console.log(error.code)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    rej(error)
                });
            })
        )
}