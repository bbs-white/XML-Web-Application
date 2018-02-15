function applySelection(selection){
    var url = document.myForm.myMenu.options[selection.selectedIndex].value;
    doXMLHttpRequest(url);
}

function createXmlHttp(){
    // Mozilla, Firefox, Safari, IE7
    if(window.XMLHttpRequest){
	return new XMLHttpRequest();
    }else if(window.ActiveXObject){
	// IE5, IE6
	try{
	    return new ActiveXObject("Msxml2.XMLHTTP");
	}catch(e){
	    return new ActiveXObject("Microsoft.XMLHTTP");
	}
    }else{
	return null;
    }
}

function doXMLHttpRequest(url){
    // XMLHttpRequest object
    var xmlhttp = createXmlHttp();
    if(xmlhttp == null){
        window.alert("XMLHttpRequest is not supported.");
    }

    // How to process response data
    xmlhttp.onreadystatechange = handleHttpEvent;

    // Process HTTP request
    xmlhttp.open("GET", "/~amagasa/cgi-bin/geturl.cgi?u=" + url , true);
    xmlhttp.send(null);

    // Callback function for response data
    function handleHttpEvent(){
        if(xmlhttp.readyState == 4){
            if(xmlhttp.status == 200){

		// for debug
		// just print out obtained XML data in a window.
		// window.alert(xmlhttp.responseText);
		
		// do xslt transformation and print the result out
		var xsl = document.implementation.createDocument("", "", null);
		xsl.async = false;
		xsl.load("rss.xsl");

		var xsltp = new XSLTProcessor();
		xsltp.importStylesheet(xsl);
		var newDoc = xsltp.transformToFragment(xmlhttp.responseXML, window.document);

		document.getElementById("disp").innerHTML = ""
		document.getElementById("disp").appendChild(newDoc);
            }else{
		window.alert("Communication error. 失敗してます.");
            }
        }
    }
}
