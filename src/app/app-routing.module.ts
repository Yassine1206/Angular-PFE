import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './shop/cart/cart.component';
import { CategoryComponent } from './shop/category/category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  { path: 'accueil', component: HomeComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'profile', component: EditProfileComponent },
  { path: 'categorie/:code', component: CategoryComponent },

  { path: 'panier', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
