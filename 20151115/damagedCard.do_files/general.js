
function orderCard(){
		window.location.href='../ClipperCard/order.jsf';		
	}

function cancelRegisterCard(){
	window.location.href='index.do';	
}
function cancelEditPayment(){
	window.location.href='accountManagement.do';	
}

function doClick(buttonName, e)
    {
    	//alert("in doClick function");
		//the purpose of this function is to allow the enter key to 
		//point to the correct button to click.
        var key;
            
        if(window.event){        	
              key = e.keyCode;    //IE            
         }        
        else { 
        	key = e.which;   //firefox    
       	 }              
   		//alert("key is :" +key);         
        if (key == 13)
        {
           //Get the button the user wants to have clicked
            var btn = document.getElementById(buttonName);
            if (btn != null)
            { //If we find the button click it
                btn.click();
                e.keyCode = 0
            }
        }
   }
   
function whichButton(event){
if(event.button==2){
	alert("Cannot paste, Please re-enter");
	//document.CardForm.cardNumber.focus();
	return false;
	}
}
function noCTRL(e){
var code  = (document.all)?event.keyCode:e.which;
var msg = "Cannot paste, Please re-enter";
if(parseInt(code) == 17){
	alert(msg);
	//document.CardForm.cardNumber.focus();
	return false;
	window.event.returnValue  = false;
	}
}

function disableButtons() {
   		document.getElementById("cancel").disabled = true;
   		document.getElementById("submit").disabled = true;	   	 	
   	  	return true;	   	      
	   }
