import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'cookie-banner',
	templateUrl: './cookie-banner.component.html',
	styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {

	@Input() ngStyle: { [key: string]: string; }

	@Input() days: number;
	@Input() cookiename: string;
	@Input() cookievalue: string;
	@Input() message: string;
	@Input() dataSecurityLink: string;
	@Input() position: string;
	@Input() color: string;
	@Input() bgcolor: string;

  @ViewChild("cookiebanner") el: ElementRef;

  cookielaw = {
    "width": "100%",
    "margin": "0px auto",
    "border-radius": "0px",
    "-webkit-border-rradius": "0px",
    "-moz-border-radius": "0px",
    "position": "absolute",
    "padding": "5px"
  };

  cookietext = {
    "padding": "10px",
    "font-size": "1.1em",
    "text-align": "left",
    "margin": "0"
  };

  information = {
    "margin": "10px",
    "width": "100%"
  };

  datasecurity = {
    "padding": "10px"
  };

  accept = {
    "max-width": "100px"
  };

  button = {
    "padding": "10px",
    "background-color": this.color || "#fff",
    "color": this.bgcolor || "#000",
    "border": "1px solid #000"
  };

  link = {
    "color": this.color || "#fff"
  };

	constructor() { }

	ngOnInit() {

		if(this.bgcolor == "" || this.bgcolor == null){
			this.el.nativeElement.style.background = "#000";
			this.el.nativeElement.children[1].children[0].children[0].children[0].style.background = "#fff";
		} else {
			this.el.nativeElement.style.background = this.bgcolor;
			this.el.nativeElement.children[1].children[0].children[0].children[0].style.background = this.color;
		}

		if(this.color == "" || this.color == null){
			this.el.nativeElement.children[0].children[0].style.color = "#fff";
			this.el.nativeElement.children[1].children[0].children[0].children[0].style.color = "#000";
		} else {
			this.el.nativeElement.children[0].children[0].style.color = this.color;
			this.el.nativeElement.children[1].children[0].children[0].children[0].style.color = this.bgcolor;
		}

		var style = document.createElement('style');
		style.type = 'text/css';

		let styling =
		` 
		@media only screen and (max-width: 768px) {
			.context, .information {
				width: 100%;
			}
		}

		@media only screen and (min-width: 768px) {
			.context {
				width: 88%;
			}

			.information {
				width: 11%;
				float: right;
				margin-top: -42px;
			}
		}
		`

		style.innerHTML = styling;
		document.getElementsByTagName('head')[0].appendChild(style);


	}

	ngAfterViewInit() {

		var dropCookie = true;
		var cookieDuration = this.days || 365;
		var cookieName = this.cookiename;
		var cookieValue = this.cookievalue;
		var cookieMessage = this.message || "Wir verwenden Cookies. Bei den Besuch und weiteren Verlauf der Webseite akzeptieren Sie die Berechtigung und Nutzung der Cookies.";
		var dataPolicyLink = this.dataSecurityLink || "#";
		var expires;

		document.getElementById("close-cookie-banner").addEventListener("click",function(){
			acceptCookie();
		});

		document.getElementById("message").innerHTML = cookieMessage;
		document.getElementById("data-link").setAttribute("href", dataPolicyLink);

		if(this.position == "top"){
			document.getElementById("cookie-law").style.top = "0";
		} else if(this.position == "bottom"){
			document.getElementById("cookie-law").style.bottom = "0";
		} else {
			document.getElementById("cookie-law").style.top = "0";
		}

		function createCookie(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000)); 
				expires = "; expires=" + date.toGMTString(); 
			}
			else {
				expires = "";
			}
			if(window.dropCookie) { 
				document.cookie = name+"="+value+expires+"; path=/"; 
			}
		}

		function createCookieBanner(){
			var main = document.getElementsByTagName('body')[0];
			var cid = document.getElementById('cookie-law');

			main.insertBefore(cid,main.firstChild);

			document.getElementsByTagName('body')[0].className+=' cookiebanner';

			createCookie(window.cookieName,window.cookieValue, window.cookieDuration);
		}

		function checkCookie(name) {
			var validator = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(validator) == 0) return c.substring(validator.length,c.length);
			}
			return null;
		}

		function eraseCookie(name) {
			createCookie(name,"",-1);
		}

		window.onload = function(){
			if(checkCookie(window.cookieName) != window.cookieValue){
				createCookieBanner(); 
			} else {
				console.log(window.cookieName + " - " + window.cookieValue);
			}
		}

		function acceptCookie(){
			var element = document.getElementById('cookie-law');
			element.parentNode.removeChild(element);
		}

	}

}
