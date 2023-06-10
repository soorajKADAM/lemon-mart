import { AuthMode } from 'src/app/auth/auth.enum'

export const environment = {
  production: false,
  authMode: AuthMode.InMemory,
  firebase: {
    projectId: 'lemon-mart-92796',
    appId: '1:908489416159:web:453f59cf9f9a7f031db86a',
    storageBucket: 'lemon-mart-92796.appspot.com',
    apiKey: 'AIzaSyCdutUg7r7AG4SiOHwOO-SZW34Ea1s7Npk',
    authDomain: 'lemon-mart-92796.firebaseapp.com',
    messagingSenderId: '908489416159',
    measurementId: 'G-P5VJ8KFMQC',
  },
}
