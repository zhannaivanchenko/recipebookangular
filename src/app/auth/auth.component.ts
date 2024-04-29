import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceHolderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            console.log("Coming into login condition")
            this.isLoading = true;
            authObs = this.authService.login(email, password);
        } else {
            this.isLoading = true;
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            resData => {
                console.log("here comes resdata in subscribe=", resData);
                this.isLoading = false;
                console.log("I should be navigating now!");
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        )
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }

}
