//Global Variables 
var siteNavigation = document.getElementById('site-navigation');
if (siteNavigation!==null) {
	var subMenuClassElements = siteNavigation.getElementsByClassName('sub-menu');
	var subMenuElementsClicked = siteNavigation.getElementsByClassName('sub-menu-clicked');
}
var submenuListquantity;
var submenuBlockHeight;



/*------------------------------------------------------------
Set necessesary Attributes to Menu
--------------------------------------------------------------*/
function setAttributesToMenu() {
	if (!siteNavigation) return;
	
	//Set Attributes for lowerest lvl menu blocks 
	function setAttributesForSecondSubmenu() {
		
		//Target only lower level elements which contains 
		for(i=0; i<subMenuClassElements.length; i++) {	
			
			//Get Every child elements in sub-menu class 
			subMenuChildrens = subMenuClassElements[i].children;			
			for(k=0; k<subMenuChildrens.length; k++) {
				everySubmenuChild = subMenuChildrens[k]; 
		
				if (everySubmenuChild.classList.contains('menu-item-has-children') ) {
					
					//Change second level li element class where contains lower menu
					everySubmenuChild.classList.remove('menu-item-has-children');
					everySubmenuChild.classList.add('submenu-item-has-children');

					//Change sub-menu class where element contains lower level menu
					subMenuChildrens[k].querySelectorAll("ul.sub-menu")[0].classList.add('menu-of-submenu');
					subMenuChildrens[k].querySelectorAll("ul.sub-menu")[0].classList.remove('sub-menu');					
				}
			}
		}

		// Get all li tags with sub menu class and set mark with atributes.
		var subMenu = siteNavigation.querySelectorAll("li.submenu-item-has-children");
		var menuOfSubmenu = siteNavigation.getElementsByClassName('menu-of-submenu');

		for(i=0; i<subMenu.length; i++) {
			var markedLink = subMenu[i].getElementsByTagName('a');
			markedLink[0].setAttribute('class', 'marked-anchor-lower');
			markedLink[0].setAttribute('data-open', 'False');
			markedLink[0].setAttribute("onClick", "secondLvlMenuExpand('submenu-marked-item-" + i + "')");
			markedLink[0].setAttribute('id', "submenu-marked-item-" + i + "-" + i);	
		}

		// Get all elements with sub-menu class and each add ID "marked-item-'elementNumber' "
		var menuOfSubmenu = siteNavigation.querySelectorAll("ul.menu-of-submenu");

		for(i=0; i<menuOfSubmenu.length; i++) {
			menuOfSubmenu[i].setAttribute('id', 'submenu-marked-item-'+i);
			menuOfSubmenu[i].setAttribute('data-focus', 'False');
		}
	}	
	// Set attributes for lower lvl menu blocks
	function setAttributesForSubmenu() {
		// Get all li tags with sub menu class and set mark with atributes.
		var subMenu = siteNavigation.querySelectorAll("li.menu-item-has-children");
		var subMenuClass = subMenuClassElements;

		// Set class, data-open, onClick event and id attributes to menu item which has children
		for(i=0; i<subMenu.length; i++) {
			var liWithSubmenu = subMenu[i].getElementsByTagName('a');
			liWithSubmenu[0].setAttribute('class', 'marked-anchor');
			liWithSubmenu[0].setAttribute('data-open', 'False');
			liWithSubmenu[0].setAttribute("onClick", "firstLevelMenuExpand('marked-item-" + i + "')");
			liWithSubmenu[0].setAttribute('id', "marked-item-" + i + "-" + i);	
		}

		// Get all elements with sub-menu class and each add ID "marked-item-'elementNumber' "
		var subMenuClass = document.getElementById('site-navigation').querySelectorAll("ul.sub-menu");

		for(i=0; i<subMenuClass.length; i++) {
			subMenuClass[i].setAttribute('id', 'marked-item-'+i);
			subMenuClass[i].setAttribute('data-focus', 'False');
		}
	}
	//Set attributes for back button in lowerest menu
	function setAttributesForBackButton() {
		var menuOfSubmenu = document.getElementsByClassName('menu-of-submenu');
		
		for (q=0; q < menuOfSubmenu.length; q++) {
			var aTag = document.createElement('a');
				aTag.setAttribute('class', 'third-menu-open');
				aTag.setAttribute('onClick', 'secondLvlMenuExpand("submenu-marked-item-'+ q +'")');
			var backText = document.createTextNode('Back');	
			var liElement = document.createElement('li');
				liElement.appendChild(aTag).appendChild(backText); 
				
				menuOfSubmenu[q].insertBefore(liElement, menuOfSubmenu[q].firstChild);
		}
	}
//Call functions
setAttributesForSecondSubmenu();
setAttributesForSubmenu();
setAttributesForBackButton();
addArrows();
addSideArrows();
}
/*------------------------------------------------------------
Add arrow icons to menu elements 
--------------------------------------------------------------*/
//Add up and down arrows
function addArrows() {
	
		for(i=0; i<subMenuClassElements.length; i++) {
			subMenuClassElements[i].parentElement.classList.add('arrow-down');
			subMenuClassElements[i].parentElement.classList.remove('arrow-up');			
		}		

		for(z=0; z<subMenuElementsClicked.length; z++) {
			subMenuElementsClicked[z].parentElement.classList.add('arrow-up');
			subMenuElementsClicked[z].parentElement.classList.remove('arrow-down');
		}	
}
//Add right side arrows
function addSideArrows() {
	
	var liElements = document.querySelectorAll("li.submenu-item-has-children");
		
		for(i=0; i<liElements.length; i++) {			
			var liChildrens = liElements[i].children;
			var liAttributes = liChildrens[0].getAttribute('data-open');

			if(liAttributes == 'False') {
				liElements[i].classList.add('arrow-right');
			} else {
				liElements[i].classList.remove('arrow-right');
			}	
		}
}


/*------------------------------------------------------------
Expand 1lvl menu items onClicking
--------------------------------------------------------------*/
function firstLevelMenuExpand(e) {

	// Get ul list with id marked-item-"i"
	var submenuBlock = document.getElementById(e);
	
	//Calculate sub-menu height
	submenuListquantity = submenuBlock.children;
	submenuBlockHeight = (submenuListquantity.length)* 47;
	
	// Get Clicked Link [a] id
	var submenuBlockId = submenuBlock.getAttribute('id');
	var w = submenuBlockId.substr(submenuBlockId.length - 1);
	var linkId = document.getElementById(e + "-" + w);
	
	
	//Open or Close sub-menu on Click
	var z = linkId.getAttribute('data-open');
		if ( z == 'False') {
				
			//Reset attribute and close opened menu 
			var subMenuReset = document.getElementsByClassName('sub-menu-clicked');			
				for(i=0; i<subMenuReset.length; i++) {
					subMenuReset[i].classList.add('sub-menu');
					subMenuReset[i].classList.remove('sub-menu-clicked');						
				}
			var markedA = document.getElementsByClassName('marked-anchor');
				for(s=0; s<markedA.length; s++) {
					markedA[s].setAttribute('data-open', 'False');
				}
			var markedA2lvl = document.getElementsByClassName('marked-anchor-lower');
				for(v=0; v<markedA2lvl.length; v++) {
					markedA2lvl[v].setAttribute('data-open', 'False');
				}
			//Open menu block 	
			linkId.setAttribute('data-open', 'True');
			submenuBlock.classList.remove('sub-menu');
			submenuBlock.classList.add('sub-menu-clicked');
			submenuBlock.style.height = submenuBlockHeight + 'px';
			
			//CLose menu block 	
		} else {
			linkId.setAttribute('data-open', 'False');	
			submenuBlock.classList.remove('sub-menu-clicked');
			submenuBlock.classList.add('sub-menu');
			submenuBlock.style.height = 0 + 'px';
				
		}
	
	//Close and reset all opened menu 
	var closeSubmenu2d = document.getElementsByClassName('menu-of-submenu-clicked');
	
	for(l=0; l<closeSubmenu2d.length; l++) {
		closeSubmenu2d[l].classList.add('menu-of-submenu'); 
		closeSubmenu2d[l].classList.remove('menu-of-submenu-clicked');	
	}
	//close all sub menu making height to 0
	var closeSubmenu = document.getElementsByClassName('sub-menu');
	for(g=0; g<closeSubmenu.length; g++) {
		closeSubmenu[g].style.height = 0 + 'px'; 
		closeSubmenu[g].classList.remove('submenu-on-lower-open');
		}
	
	//Add arrows icons
	addArrows();
	addSideArrows();

}

/*------------------------------------------------------------
Expand 2lvl menu items onClicking
--------------------------------------------------------------*/
function secondLvlMenuExpand(e) {

	// Get ul list with id's 
	var lowerSubmenuBlock = document.getElementById(e);
	var openLowerSubmenuBlock = lowerSubmenuBlock.parentElement.parentElement;
	
	// Get Clicked Link [a] id:
	var lowerSubmenuBlockId = lowerSubmenuBlock.getAttribute('id');
	var w = lowerSubmenuBlockId.substr(lowerSubmenuBlockId.length - 1);
	var linkId = document.getElementById(e + "-" + w);
	
	//Calculate lover lvl submenu height:
	var submenuChildrens = lowerSubmenuBlock.children;
	var lowerSubmenuHeight = (submenuChildrens.length)* 47;

	//Open or Close lower submenu:
	var z = linkId.getAttribute('data-open');
		if ( z == 'False') {
			lowerSubmenuBlock.classList.add('menu-of-submenu-clicked');
			lowerSubmenuBlock.classList.remove('menu-of-submenu');		
			linkId.setAttribute('data-open', 'True');
			
			//Set height			
			openLowerSubmenuBlock.classList.add('submenu-on-lower-open');
			openLowerSubmenuBlock.style.height = lowerSubmenuHeight + 'px';
			
		} else {
			lowerSubmenuBlock.classList.add('menu-of-submenu');
			lowerSubmenuBlock.classList.remove('menu-of-submenu-clicked');
			linkId.setAttribute('data-open', 'False');
			
			openLowerSubmenuBlock.classList.remove('submenu-on-lower-open');
			openLowerSubmenuBlock.style.height = submenuBlockHeight + 'px';	
			
		}

	//Add side Arrows 
	addSideArrows();		
}

window.onload = function() {
	setAttributesToMenu();
}