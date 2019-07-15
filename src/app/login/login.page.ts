import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  constructor(
    public afAuth: AngularFireAuth,
    public alert:AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async login() {

    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username +'@gmail.com', password);
      this.router.navigateByUrl(`/todo/${res.user.uid}`);
    } catch (err) {
      this.showAlert("Error", err.message);
    }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })

    await alert.present()
  }

}
