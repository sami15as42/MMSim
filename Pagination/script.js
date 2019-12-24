/**************************************************************************/
/**************************************************************************/
/*************************** Custom Select ********************************/
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        firsttime=false;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			if (firsttime==true){
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
			}else{
				closeAllSelect(this);
			}
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

/*********************************************************************************************************************/
/*********************************************************************************************************************/
/********************************** chart to store processes and thier page table ************************************/
var ctx = document.getElementById('myChart').getContext('2d');
  var colo='rgb(255,255,255)';
	var chart1 = new Chart(ctx, {
		// The type of chart we want to create
	
		type: 'pie',

    // The data for our dataset
	
	data: {
        labels: ["secteur", "Secteur", "Secteur", "Secteur", "Secteur", "Secteur", "Secteur"],
        datasets: [{ // each table element represents a secteur 
            label: "My First dataset",
          
            backgroundColor:[ 'rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)',],
			hoverBorderWidth: 2,
			hoverBackgroundColor:'rgb(0,102,204)',
			hoverBorderWidth: 5,
            data: [10, 10, 10, 10, 10, 10, 10],
		},
		{
            label: "My second dataset",
            backgroundColor:[ 'rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)',],
			hoverBorderWidth: 2,
			hoverBackgroundColor:'rgb(0,102,204)',
			hoverBorderWidth: 5,
			cutoutPercentage:50,
            data: [10, 10, 10, 10, 10, 10, 10],
		},
		{
      		label: "My third dataset",
      		backgroundColor:[ 'rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)','rgb(0,0,0)',],
			hoverBorderWidth: 5,
			cutoutPercentage:50,
			hoverBackgroundColor:'rgb(0,102,204)',
            data: [10, 10, 10, 10, 10, 10, 10],
		}
	]
    },

    // Configuration options go here
    options: {
	cutoutPercentage:15,
	// function to excute when clicking on a secture 
    'onClick' : function (evt, item) 
    {
    	if (!pageEnCours)
    	{
	        if (item.length){
	            if (existanceProcessus(item[0]._index,item[0]._datasetIndex)){
					processusAct = ProcessusByCO(item[0]._index,item[0]._datasetIndex);
					// if the table is shown hide it else show it
	                if (!processusAct.shown)
	                {
	                	afficherTab(processusAct.listePages);
	                	i = 0;
	                	while (i<listeProcessus.length) {listeProcessus[i].shown = false; i++;}
	                	processusAct.shown = true;
	                }
	                else
	                {
	                    $("#arrayContainer").hide();
	                    processusAct.shown = false;
	                }
	            }
	        }
	    }
	},
	//action to excute when hoverd over
    'onHover' : function (evt, item) {
      var bool=true;
      if (item.length==1)
      {
        bool=existanceProcessus(item[0]._index,item[0]._datasetIndex);
        this.options.tooltips.enabled=bool;
      }
    },
		legend:{
			display:false
		},
		// tooltips are showed when hoverd over the sectur
		tooltips:{
        callbacks:{
          title: function(tooltipItem, data) {
              return "Processus ID: " + ProcessusID(tooltipItem[0].index,tooltipItem[0].datasetIndex);
          },
          label: function(tooltipItem, data) {
            //return data['datasets'][0]['data'][tooltipItem['index']];
            return null;
          },
          afterlabel: function(tooltipItem, data){
            return null;
          }
    }
  }
	}
});

/******************************* Dropdown *********************************/
function myFunction11() {

  if($(".fa").hasClass('fa-caret-right'))
  {
  }
  else
  {
    myFunction();
  }
}

function myFunction() {
  meth=document.getElementById("mySelect").value;
	document.getElementById("myDropdown").classList.toggle("show");
    if($(".fa").hasClass('fa-caret-right'))
	{
	  	$(".fa").removeClass('fa-caret-right');
	  	$(".fa").addClass('fa-caret-left');
	}
  	else
  	{
		$(".fa").removeClass('fa-caret-left');
  		$(".fa").addClass('fa-caret-right');
  	}
	
	var y = window.matchMedia("(max-width: 915px)");
	if (y.matches) 
	{
		if($(".fa").hasClass('fa-caret-right')){
			document.getElementById("rightContainer").style.marginTop="195px";
		}else{
			document.getElementById("rightContainer").style.marginTop=0;
		}
	}
  
  if (meth == 1) {$(".lru-algo").hide();$(".nru-algo").hide();$(".lfu-algo").hide();$(".aging-algo").hide();$(".fifo-algo").show();}
  if (meth == 2) {$(".fifo-algo").hide();$(".nru-algo").hide();$(".lfu-algo").hide();$(".aging-algo").hide();$(".lru-algo").show();}
  if (meth == 3) {$(".lru-algo").hide();$(".fifo-algo").hide();$(".lfu-algo").hide();$(".aging-algo").hide();$(".nru-algo").show();}
  if (meth == 4) {$(".lru-algo").hide();$(".nru-algo").hide();$(".fifo-algo").hide();$(".aging-algo").hide();$(".lfu-algo").show();}
  if (meth == 5) {$(".lru-algo").hide();$(".nru-algo").hide();$(".lfu-algo").hide();$(".fifo-algo").hide();$(".aging-algo").show();}
	
	
}
/**************************************************************************/
/**************************************************************************/
/***************************** Modif Button *******************************/
function modifClicked(i) {
	if (!pageEnCours)
	{
		if (processusAct.listePages[i].modif == 0) processusAct.listePages[i].modif = 1;
		else processusAct.listePages[i].modif = 0;
		afficherTab(processusAct.listePages);
	}
}
/**************************************************************************/
/**************************************************************************/
/***************************** Page Button ********************************/
var MDR=["FIFO","LRU","NRU","LFU","Aging"];
var nombreDePageDansMC=0;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clicked(i) 
{
	//
	if (!pageEnCours)
	{	
		pageEnCours = true;
		document.getElementById("loading").style.display="block";
		var instructions=document.getElementById("ins");
		instructions.innerHTML="Chercher si la page existe en MC ...";	
		await sleep(3000);
		var page=processusAct.listePages[i];
		pagee = new Page();
		pagee.id = processusAct.listePages[i].id;
		pageId--;
		pagee.modif = processusAct.listePages[i].modif; 
		if (processusAct.listePages[i].use==0) {processusAct.listePages[i].use=1; page1=processusAct.listePages[i];}
		else page1=pagee;
		if (page.present)
		{
			instructions.innerHTML="Page "+page.id+" existe en MC ...";
			document.getElementById("memory").style.border="solid rgb(72, 255, 0) 4px";
			document.getElementById("blockLabelArray"+(i+1)+"3").style.backgroundColor="rgb(72, 255, 0)";
			await sleep(3000); // sleep to slow down the showing of instruction we have a space of 3000ms every intruction
			document.getElementById("memory").style.border="solid #2C3E50 4px";
			document.getElementById("blockLabelArray"+(i+1)+"3").style.backgroundColor="#2B2E4A";
			if (meth == 2) instructions.innerHTML="Mettre à jour les attributs de Page "+page.id+" et les valeurs des compteurs";
			else instructions.innerHTML="Mettre à jour les attributs de Page "+page.id+" ...";
			document.getElementById("blockLabelArray"+(i+1)+"2").style.backgroundColor="rgb(72, 255, 0)";
			await sleep(4000);
			listePagesSelected.push(page1);
			instructions.innerHTML="Fin";
			await sleep(800);
			instructions.innerHTML="Instructions"; 
			document.getElementById("loading").style.display="none";
			pageEnCours = false;
			return null; 
		}
		else
		{
		nombreDePageDansMC++;
		// here we find the instruction to show 
		instructions.innerHTML="Page "+page.id+" n'existe pas en MC ...";
		document.getElementById("memory").style.border="solid rgb(255, 0, 0) 4px";
		document.getElementById("blockLabelArray"+(i+1)+"3").style.backgroundColor="rgb(255, 0, 0)";
		await sleep(3000);
		document.getElementById("memory").style.border="solid #2C3E50 4px";
		document.getElementById("blockLabelArray"+(i+1)+"3").style.backgroundColor="#2B2E4A";
		instructions.innerHTML="Vérifier s'il y a de la place en MC ...";
		await sleep(2000);
		if (nombreDePageDansMC<capacity+1) 
		{
			// if heres place in memory we print it
			document.getElementById("memory").style.border="solid rgb(72, 255, 0) 4px";
			instructions.innerHTML="Il y a de la place en MC ...";
			await sleep(3000);
			document.getElementById("memory").style.border="solid #2C3E50 4px";
			if (meth == 2) {instructions.innerHTML="Insérer Page "+page.id+" dans MC et mettre à jour les compteurs ...";await sleep(3500);}
			else {instructions.innerHTML="Insérer Page "+page.id+" dans MC";await sleep(2000);}
			listePagesSelected.push(page1);// push the page in MC 
			await sleep(1000);
			instructions.innerHTML="Fin";
			await sleep(800);
			instructions.innerHTML="Instructions"; 
			document.getElementById("loading").style.display="none";
			pageEnCours = false;
			return null;
		}
		else
		{
		document.getElementById("memory").style.border="solid rgb(255, 0, 0) 4px";	
		instructions.innerHTML="MC est pleine";
		await sleep(3000);
		document.getElementById("memory").style.border="solid #2C3E50 4px";// change color of the MC
		instructions.innerHTML="Trouver un remplaçant selon la méthode "+MDR[meth-1]+" ...";
		await sleep(3000);
		var listePagesSelected1 = [];
		for (var k=0;k<listePagesSelected.length;k++)
		{
			listePagesSelected1.push(listePagesSelected[k]);
		}
		listePagesSelected1.push(page1);
		///////////////////////////////////////////////////
		if (cycle == 4)
				{
					for (k=0;k<listePagesSelected1.length;k++)
					{
						listePagesSelected1[k].reference = 0;
					}
					cycle = 0;
				};
				cycle = cycle +1;
				if (meth == 1)
				{
		//**************** FIFO **************//
					// print first instructions
				instructions.innerHTML="Donc on cherche la page la plus ancienne dans MC ...";
		        await sleep(4000);
		        instructions.innerHTML="Alors la page à remplacer c'est la page qui se trouve après la page récement insérée (la page en rouge)";
		        await sleep(6000);	
				if (listePagesSelected1.length <= capacity)
				{
					//if there's place in memory
					if (blockNum.indexOf(page1.id)==-1)
					{
						// if the page is not in memory
						blockNum[cpt] = page1.id;
						listePagesSelected1[listePagesSelected1.length-1].present=1;//change the bit of presance to 1
						listePagesSelected1[listePagesSelected1.length-1].reference=1;//change the bit of referance to 1
						page_faults = page_faults+1;
						i = cpt; //increment the nombre of pages in memory
						cpt = cpt+1;
						if (cpt==capacity) cpt=0;
					}
					else
					{
						// if the page is in memory
						i = -1;
						listePagesSelected1.pop();
						trouv=false;
						k = 0;
						//search for the pages case in memory
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								//when found change the refrence bit and modification bit
								trouv=true;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						}
					}
				}
				else 
				{
					if (blockNum.indexOf(page1.id)==-1)
					{
						// if the memory is full and the page is not in memory
						i=cpt;
						cpt++;
						if (cpt==capacity) cpt=0;
						val = blockNum[i];
						blockNum.splice(i,1,page1.id);
						page_faults = page_faults+1;
						trouv=false;
						k = 0;
						//find the page's id in the list of pages
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								trouv=true;
								listePagesSelected1[k].present=1;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						}
						if (k!=listePagesSelected1.length-1) listePagesSelected1.pop(); 
						trouv=false;
						k = 0;
						//search for the page to replace and change it's presance bit to 0
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==val) 
							{
								trouv=true;
								listePagesSelected1[k].present=0;
								//if (processes[k].modif==1) {}; //rien ? faire pour le moment
							}
							else k++;
						}
					}
					else
					{
						//if the memory is full and the page is in it  
						i = -1;
						listePagesSelected1.pop();
						trouv=false;
						k = 0;
						//search for the page in MC pages and replace it's reference bit
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								trouv=true;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						}  
					}
				}
		//**************** FIN FIFO **************//
				}
				if (meth == 2)
				{
		//**************** LRU **************//
				// print first instructions
		        instructions.innerHTML="Chercher dans MC la page avec la valeur de compteur la plus grande";
		        await sleep(6000);
				if (listePagesSelected1.length <= capacity)
				{
					//if there's place in memory
					if (blockNum.indexOf(page1.id)==-1)
					{
						// if the page is not in memory
						blockNum[cpt] = page1.id;
						indexes[cpt] = 1;
						listePagesSelected1[listePagesSelected1.length-1].present=1;//change the bit of presance to 1
						listePagesSelected1[listePagesSelected1.length-1].reference=1;//change the bit of referance to 1
						for (k=0;k<indexes.length;k++)
						{
							if (k!=cpt) indexes[k]=indexes[k]+1;
						} 
						page_faults = page_faults+1;
						i=cpt; //increment the numbre of pages in memory
						cpt = cpt+1;
					}
					else
					{
						// if the page is in memory
						i = -1;
						listePagesSelected1.pop();
						for (k=0;k<indexes.length;k++)
						{
							if (k!=blockNum.indexOf(page1.id)) indexes[k]=indexes[k]+1;
							else indexes[blockNum.indexOf(page1.id)]=1;
						}
						trouv=false;
						k = 0;
						//search for the pages case in memory 
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								trouv=true;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						} 
					}
				}
				else 
				{
					if (blockNum.indexOf(page1.id)==-1)
					{
						//search for the page in MC pages and replace it's reference bit
						lru = Number.MIN_SAFE_INTEGER; 
						val = Number.MIN_SAFE_INTEGER;
						for (k = 0; k < capacity; k++) 
						{  
							if (indexes[k] > lru) 
							{ 
								lru = indexes[k]; 
								val = k; 
							}
						}
						trouv=false;
						k = 0;
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								trouv=true;
								listePagesSelected1[k].present=1;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						}
						if (k!=listePagesSelected1.length-1) listePagesSelected1.pop(); 
						trouv=false;
						k = 0;
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==blockNum[val]) 
							{
								trouv=true;
								listePagesSelected1[k].present=0;
								//if (processes[k].modif==1) {}; //rien ? faire pour le moment
							}
							else k++;
						}
						blockNum.splice(val,1,page1.id);
						i = val; 
						for (k=0;k<indexes.length;k++)
						{
							if (k!=val) indexes[k]=indexes[k]+1;
							else indexes[k]=1;
						} 
						page_faults = page_faults+1;
					}
					else
					{
						i = -1;
						listePagesSelected1.pop();
						for (k=0;k<indexes.length;k++)
						{
							if (k!=blockNum.indexOf(page1.id)) indexes[k]=indexes[k]+1;
							else indexes[blockNum.indexOf(page1.id)]=1;
						}
						trouv=false;
						k = 0;
						//search for the page in MC pages and replace it's reference bit
						while ((!trouv)&&(k<listePagesSelected1.length))
						{
							if (listePagesSelected1[k].id==page1.id) 
							{
								trouv=true;
								listePagesSelected1[k].reference=1;
								listePagesSelected1[k].modif=page1.modif;
							}
							else k++;
						}  
					}
				}
		//**************** FIN LRU **************//	
				};
				if (meth == 3)
				{
		//**************** NRU **************//
				if (listePagesSelected1.length <= capacity)
				{
					//if there's place in memory
					if (processesPageId.length!=0) 
					{
						// if the page is not in memory
						index = processesPageId.indexOf(page1.id);
					}
					else index=-1;
					if (index==-1) 
					{
						processesPageId.push(page1.id);
					}
					else listePagesSelected1.pop();
					index = processesPageId.indexOf(page1.id);

					if (listePagesSelected1[index].present == 0)
					{
						listePagesSelected1[index].present = 1;
						listePagesSelected1[index].reference = 1;
						blockNum[cpt] = page1.id;
						page_faults = page_faults+1;
						i=cpt; //increment the numbre of pages in memory
						cpt = cpt+1;
					}
					else
					{
						i = -1;
						listePagesSelected1[index].modif = page1.modif;
						listePagesSelected1[index].reference = 1;
					};
				}
				else 
				{
					index = processesPageId.indexOf(page1.id);
					if (index==-1) 
					{
						processesPageId.push(page1.id);
					}
					else listePagesSelected1.pop();
					index = processesPageId.indexOf(page1.id);

					if (listePagesSelected1[index].present == 0)
					{
						page_faults = page_faults+1;
						trouv = false;
						cpt = 0;
						while (!trouv)
						{
							i1=0;
						    if (cpt==0) {R=0;M=0;};
						    if (cpt==1) {R=0;M=1;};
						    if (cpt==2) {R=1;M=0;};
						    if (cpt==3) {R=1;M=1;};
						    instructions.innerHTML="Chercher dans MC une page avec R = "+R+" et M = "+M;
		        			await sleep(4000);
							while ((!trouv) && (i1<listePagesSelected1.length))
							{
								if ((listePagesSelected1[i1].present==1)&&(listePagesSelected1[i1].modif==M)&&(listePagesSelected1[i1].reference==R)) 
								{
									trouv=true;
									afficherTab(recherchPageProc(listePagesSelected1[i1]).listePages);
									document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"2").style.backgroundColor="rgb(72, 255, 0)";
									document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"4").style.backgroundColor="rgb(72, 255, 0)";
									instructions.innerHTML="C'est la bonne page à etre remplacer";
		        					await sleep(5000);
								}	
								else 
								{
									if (listePagesSelected1[i1].present==1)
									{
										afficherTab(recherchPageProc(listePagesSelected1[i1]).listePages);
										document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"2").style.backgroundColor="rgb(255, 0, 0)";
										document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"4").style.backgroundColor="rgb(255, 0, 0)";
										instructions.innerHTML="Page "+listePagesSelected1[i1].id+" ne vérifie pas les conditions recherchés";
			        					await sleep(5000);
										document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"2").style.backgroundColor="#2B2E4A";
										document.getElementById("blockLabelArray"+(recherchIndexPage(recherchPageProc(listePagesSelected1[i1]).listePages,listePagesSelected1[i1])+1)+"4").style.backgroundColor="#2B2E4A";
									}
									i1=i1+1;
								}
							}
							if (!trouv)
							{
								instructions.innerHTML="Il y a pas de page dans MC avec R = "+R+" et M = "+M;
		        				await sleep(4000);
		        			}
							cpt = cpt+1;
						}
						listePagesSelected1[index].modif=page1.modif; 
						listePagesSelected1[index].reference = 1;
						listePagesSelected1[index].present=1;
						listePagesSelected1[i1].present=0;
						//if (processes[i1].modif==1) {}; //rien ? faire
						i=blockNum.indexOf(listePagesSelected1[i1].id);
						blockNum[i]=page1.id;	
					}
					else
					{
						i = -1;
						listePagesSelected1[index].modif = page1.modif;
						listePagesSelected1[index].reference = 1;
					}
				}
		//**************** FIN NRU **************//
				};
				if (meth == 4)
				{
		//**************** LFU **************//
		instructions.innerHTML="Chercher dans MC la première page avec la plus petite valeur du compteur";	
		await sleep(4000);
		if (listePagesSelected1.length <= capacity)
		{
			//if there's place in memory
			if (blockNum.indexOf(page1.id)==-1)
			{
				// if the page is not in memory
				blockNum[cpt] = page1.id;
				indexes[cpt] = 1;
				listePagesSelected1[listePagesSelected1.length-1].present=1;//change the bit of presance to 1
				listePagesSelected1[listePagesSelected1.length-1].reference=1;//change the bit of referance to 1
				page_faults = page_faults+1;
				i=cpt; 
				cpt = cpt+1;
			}
			else
			{
				//if the memory is full and the page is in it 
				i = -1;
				listePagesSelected1.pop();
				indexes[blockNum.indexOf(page1.id)]++;
				trouv=false;
				k = 0;
				//search for the pages case in memory 
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				} 
			}
		}
		else 
		{
			if (blockNum.indexOf(page1.id)==-1)
			{
				lfu = Math.min.apply(null,indexes); 
				val = indexes.indexOf(Math.min.apply(null,indexes));
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].present=1;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				}
				if (k!=listePagesSelected1.length-1) listePagesSelected1.pop(); 
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==blockNum[val]) 
					{
						trouv=true;
						listePagesSelected1[k].present=0;
						//if (processes[k].modif==1) {}; //rien ? faire pour le moment
					}
					else k++;
				}
				blockNum.splice(val,1,page.id);
				i = val; 
				indexes[val]=1;
				page_faults = page_faults+1;
			}
			else
			{
				i = -1;
				listePagesSelected1.pop();
				indexes[blockNum.indexOf(page1.id)]++;
				trouv=false;
				k = 0;
				//search for the page in MC pages and replace it's reference bit
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				}  
			}
		}
		//**************** FIN LFU **************//
				};
				if (meth == 5)
				{
		//**************** AGING **************//
		if (listePagesSelected1.length <= capacity)
		{
			//if there's place in memory
			if (blockNum.indexOf(page1.id)==-1)
			{
				// if the page is not in memory
				blockNum[cpt] = page1.id;
				indexes[cpt] = 1;
				listePagesSelected1[listePagesSelected1.length-1].present=1;//change the bit of presance to 1
				listePagesSelected1[listePagesSelected1.length-1].reference=1; //change the bit of referance to 1
				page_faults = page_faults+1;
				i=cpt; 
				cpt = cpt+1;
			}
			else
			{
				//if the memory is full and the page is in it
				i = -1;
				listePagesSelected1.pop();
				trouv=false;
				k = 0;
				//search for the pages case in memory
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				} 
			}
		}
		else 
		{
			if (blockNum.indexOf(page1.id)==-1)
			{
				lfu = Math.min.apply(null,indexes); 
				val = indexes.indexOf(Math.min.apply(null,indexes));
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].present=1;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				}
				if (k!=listePagesSelected1.length-1) listePagesSelected1.pop(); 
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==blockNum[val]) 
					{
						trouv=true;
						listePagesSelected1[k].present=0;
						//if (processes[k].modif==1) {}; //rien ? faire pour le moment
					}
					else k++;
				}
				blockNum[val]=page1.id;
				indexes[val]=1;
				i = val; 
				page_faults = page_faults+1;
			}
			else
			{
				i = -1;
				listePagesSelected1.pop();
				trouv=false;
				k = 0;
				//search for the page in MC pages and replace it's reference bit
				while ((!trouv)&&(k<listePagesSelected1.length))
				{
					if (listePagesSelected1[k].id==page1.id) 
					{
						trouv=true;
						listePagesSelected1[k].reference=1;
						listePagesSelected1[k].modif=page1.modif;
					}
					else k++;
				}  
			}
		}
		//**************** FIN AGING **************//	
				}
		        if (i != -1)
		        {
					// after choosing the page to replace 
		        	trouv = false;k=0;
		        	while (!trouv)
		        	{
		        		if (listePagesSelected1[k].id == blockNum[i]) {trouv=true; listePagesSelected1[k].case=i;}
		        		else k++; 
		        	}
					block = heap.returnHead();
					//get the head of the heap
		        	while (block!=null)
		        	{
		        		block.available = true;
		        		block = block.next;
		        	}
		        	block = heap.returnHead();
		        	if (i != 0)
		        	{
		        		for (var i1 = 0; i1 < i; i1++)
						{
							block = block.next;
						}
		        	}
		        	/////////////////////////////////////
					pageARemplacer = block.page;
					if (pageARemplacer!=null)
					{
						trouv = false; i = 0;
		        		while ((!trouv) && (i<listeProcessus.length))
		        		{
		        			if (listeProcessus[i].pageExist(pageARemplacer) != -1) trouv=true;
		        			else i++;
		        		}
						block1=block;
						if (meth == 2) 
						{
							instructions.innerHTML="Mettre à jour les compteurs ...";
							await sleep(3000);
						}
						$("#arrayContainer").hide();
						instructions.innerHTML="La page à remplacer: Page "+pageARemplacer.id+" du processus: "+listeProcessus[i].id;
						afficherTab(listeProcessus[i].listePages);
						//get the html element and change it's style
						document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)).style.backgroundColor="rgb(72, 255, 0)";
						document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"1").style.backgroundColor="rgb(72, 255, 0)";
						document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"2").style.backgroundColor="rgb(72, 255, 0)";
						document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"3").style.backgroundColor="rgb(72, 255, 0)";
						document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"4").style.backgroundColor="rgb(72, 255, 0)";
						await sleep(5000);
						instructions.innerHTML="Vérifier le champ modif de la page à remplacer";
						if (pageARemplacer.modif == 1)
						{
							// if the page has been modified 
							document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"4").style.backgroundColor="rgb(72, 255, 0)";
							instructions.innerHTML="Page "+pageARemplacer.id+" a été modifi?";
							await sleep(3000);
							instructions.innerHTML="Réécrire Page "+pageARemplacer.id+" dans MS avant de la remplacer";
							await sleep(4000);
						} 			
						else 
						{
							//the page has not been modified
							document.getElementById("blockLabelArray"+(recherchIndexPage(listeProcessus[i].listePages,pageARemplacer)+1)+"4").style.backgroundColor="rgb(72, 255, 0)";
							instructions.innerHTML="Page "+pageARemplacer.id+" n'a pas été modifié => remplacement direct";
							await sleep(3000);	
						}
					};
					/////////////////////////////////////////
					page1.allocatedBlock = block1;
					block1.setPage(page1);
		        }
		        $("#arrayContainer").hide();
		        afficherTab(processusAct.listePages);
		///////////////////////////////////////////////////
		listePagesSelected = listePagesSelected1;
		instructions.innerHTML="Fin";
		await sleep(800); // sleep to slow down the excution 
		instructions.innerHTML="Instructions"; 
		document.getElementById("loading").style.display="none";
		pageEnCours = false;
		}
		}
	}
}

function recherchIndexPage(listePages,page){// to search for the page in the page table
	for (i=0; i<listePages.length; i++) {
		if (listePages[i].id==page.id) return i;
	}
	return -1;
}
function recherchPageProc(page){ // to search for the page in it's process
 var pageId=page.id;
	for (i=0; i<listeProcessus.length; i++) {
		for (j=0; j<listeProcessus[i].listePages.length; j++){
			if (listeProcessus[i].listePages[j].id==pageId) return listeProcessus[i];
		}
	}
}
/****************************************************************************************************************/
function Page() { //class page represents a page in memory
	this.size = pageSize;
	this.modif = 0;
	this.reference = 0;
	this.present = 0;
	this.case = 0;
	this.use = 0;
	this.allocatedBlock = null;
	this.id = pageId; // identifier of the page (unique)
	pageId++;
	this.isAllocated = function() {
		return this.allocatedBlock != null;
	};
};

function Processus(id,nbPage) { // class processus
  	this.id = id;
  	this.shown=false;
	this.secteur = nbSecteur;
	this.piste = nbPiste;
	nbSecteur++;
	if (nbSecteur==7)
	{
		nbSecteur=0;
		nbPiste++;
	}
	var tab = [];
	for (i=0; i<nbPage; i++) {
		tab.push(new Page());
	};
	this.listePages = tab;
	this.pageExist = function(page) {
		return this.listePages.indexOf(page); 
	}
};

function MemControlBlock() { // class MemControlBlock
	this.size = pageSize;
	this.page = null;
	this.available = true; // true if the block is available
	this.next = null;
	this.prev = null;	
	this.setPage = function(page) { 
		if (page == null) {
			this.page = null;
			this.available = true;
		} else {
			this.page = page;
			this.available = false;
		};
	};
};

function Heap() {// class heap
	this.head = null;
	this.size = 0;

	this.returnHead = function()
	{
		return this.head;
	}

	this.requestAllocation = function(page) 
	{
		if (cycle == 4)
		{
			for (k=0;k<listePagesSelected.length;k++)
			{
				listePagesSelected[k].reference = 0;
			}
			cycle = 0;
		};
		cycle = cycle +1;
		if (meth == 1)
		{
//**************** FIFO **************//		
		if (listePagesSelected.length <= capacity)
		{
			if (blockNum.indexOf(page.id)==-1)
			{
				blockNum[cpt] = page.id;
				listePagesSelected[listePagesSelected.length-1].present=1;
				listePagesSelected[listePagesSelected.length-1].reference=1;
				page_faults = page_faults+1;
				i = cpt; 
				cpt = cpt+1;
				if (cpt==capacity) cpt=0;
			}
			else
			{
				i = -1;
				listePagesSelected.pop();
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				}
			}
		}
		else 
		{
			if (blockNum.indexOf(page.id)==-1)
			{
				i=cpt;
				cpt++;
				if (cpt==capacity) cpt=0;
				val = blockNum[i];
				blockNum.splice(i,1,page.id);
				page_faults = page_faults+1;
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].present=1;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				}
				if (k!=listePagesSelected.length-1) listePagesSelected.pop(); 
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==val) 
					{
						trouv=true;
						listePagesSelected[k].present=0;
						//if (processes[k].modif==1) {}; //rien ? faire pour le moment
					}
					else k++;
				}
			}
			else
			{
				i = -1;
				listePagesSelected.pop();
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				}  
			}
		}
//**************** FIN FIFO **************//
		}
		if (meth == 2)
		{
//**************** LRU **************//
		if (listePagesSelected.length <= capacity)
		{
			if (blockNum.indexOf(page.id)==-1)
			{
				blockNum[cpt] = page.id;
				indexes[cpt] = 1;
				listePagesSelected[listePagesSelected.length-1].present=1;
				listePagesSelected[listePagesSelected.length-1].reference=1;
				for (k=0;k<indexes.length;k++)
				{
					if (k!=cpt) indexes[k]=indexes[k]+1;
				} 
				page_faults = page_faults+1;
				i=cpt; 
				cpt = cpt+1;
			}
			else
			{
				i = -1;
				listePagesSelected.pop();
				for (k=0;k<indexes.length;k++)
				{
					if (k!=blockNum.indexOf(page.id)) indexes[k]=indexes[k]+1;
					else indexes[blockNum.indexOf(page.id)]=1;
				}
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				} 
			}
		}
		else 
		{
			if (blockNum.indexOf(page.id)==-1)
			{
				lru = Number.MIN_SAFE_INTEGER; 
				val = Number.MIN_SAFE_INTEGER;
				for (k = 0; k < capacity; k++) 
				{  
					if (indexes[k] > lru) 
					{ 
						lru = indexes[k]; 
						val = k; 
					}
				}
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].present=1;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				}
				if (k!=listePagesSelected.length-1) listePagesSelected.pop(); 
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==blockNum[val]) 
					{
						trouv=true;
						listePagesSelected[k].present=0;
						//if (processes[k].modif==1) {}; //rien ? faire pour le moment
					}
					else k++;
				}
				blockNum.splice(val,1,page.id);
				i = val; 
				for (k=0;k<indexes.length;k++)
				{
					if (k!=val) indexes[k]=indexes[k]+1;
					else indexes[k]=1;
				} 
				page_faults = page_faults+1;
			}
			else
			{
				i = -1;
				listePagesSelected.pop();
				for (k=0;k<indexes.length;k++)
				{
					if (k!=blockNum.indexOf(page.id)) indexes[k]=indexes[k]+1;
					else indexes[blockNum.indexOf(page.id)]=1;
				}
				trouv=false;
				k = 0;
				while ((!trouv)&&(k<listePagesSelected.length))
				{
					if (listePagesSelected[k].id==page.id) 
					{
						trouv=true;
						listePagesSelected[k].reference=1;
						listePagesSelected[k].modif=page.modif;
					}
					else k++;
				}  
			}
		}
//**************** FIN LRU **************//	
		};
		if (meth == 3)
		{
//**************** NRU **************//
		if (listePagesSelected.length <= capacity)
		{
			if (processesPageId.length!=0) 
			{
				index = processesPageId.indexOf(page.id);
			}
			else index=-1;
			if (index==-1) 
			{
				processesPageId.push(page.id);
			}
			else listePagesSelected.pop();
			index = processesPageId.indexOf(page.id);

			if (listePagesSelected[index].present == 0)
			{
				listePagesSelected[index].present = 1;
				listePagesSelected[index].reference = 1;
				blockNum[cpt] = page.id;
				page_faults = page_faults+1;
				i=cpt; 
				cpt = cpt+1;
			}
			else
			{
				i = -1;
				listePagesSelected[index].modif = page.modif;
				listePagesSelected[index].reference = 1;
			};
		}
		else 
		{
			index = processesPageId.indexOf(page.id);
			if (index==-1) 
			{
				processesPageId.push(page.id);
			}
			else listePagesSelected.pop();
			index = processesPageId.indexOf(page.id);

			if (listePagesSelected[index].present == 0)
			{
				page_faults = page_faults+1;
				trouv = false;
				cpt = 0;
				while (!trouv)
				{
					i1=0;
				    if (cpt==0) {R=0;M=0;};
				    if (cpt==1) {R=0;M=1;};
				    if (cpt==2) {R=1;M=0;};
				    if (cpt==3) {R=1;M=1;};
					while ((!trouv) && (i1<listePagesSelected.length))
					{
						if ((listePagesSelected[i1].present==1)&&(listePagesSelected[i1].modif==M)&&(listePagesSelected[i1].reference==R)) trouv=true;
						else i1=i1+1;
					}
					cpt = cpt+1;
				}
				listePagesSelected[index].modif=page.modif; 
				listePagesSelected[index].reference = 1;
				listePagesSelected[index].present=1;
				listePagesSelected[i1].present=0;
				//if (processes[i1].modif==1) {}; //rien ? faire
				i=blockNum.indexOf(listePagesSelected[i1].id);
				blockNum[i]=page.id;
			}
			else
			{
				i = -1;
				listePagesSelected[index].modif = page.modif;
				listePagesSelected[index].reference = 1;
			}
		}
//**************** FIN NRU **************//
		};
		if (meth == 4)
		{
//**************** LFU **************//
if (listePagesSelected.length <= capacity)
{
	if (blockNum.indexOf(page.id)==-1)
	{
		blockNum[cpt] = page.id;
		indexes[cpt] = 1;
		listePagesSelected[listePagesSelected.length-1].present=1;
		listePagesSelected[listePagesSelected.length-1].reference=1;
		page_faults = page_faults+1;
		i=cpt; 
		cpt = cpt+1;
	}
	else
	{
		i = -1;
		listePagesSelected.pop();
		indexes[blockNum.indexOf(page.id)]++;
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		} 
	}
}
else 
{
	if (blockNum.indexOf(page.id)==-1)
	{
		lfu = Math.min.apply(null,indexes); 
		val = indexes.indexOf(Math.min.apply(null,indexes));
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].present=1;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		}
		if (k!=listePagesSelected.length-1) listePagesSelected.pop(); 
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==blockNum[val]) 
			{
				trouv=true;
				listePagesSelected[k].present=0;
				//if (processes[k].modif==1) {}; //rien ? faire pour le moment
			}
			else k++;
		}
		blockNum.splice(val,1,page.id);
		i = val; 
		indexes[val]=1;
		page_faults = page_faults+1;
	}
	else
	{
		i = -1;
		listePagesSelected.pop();
		indexes[blockNum.indexOf(page.id)]++;
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		}  
	}
}
//**************** FIN LFU **************//
		};
		if (meth == 5)
		{
//**************** AGING **************//
if (listePagesSelected.length <= capacity)
{
	if (blockNum.indexOf(page.id)==-1)
	{
		blockNum[cpt] = page.id;
		indexes[cpt] = 1;
		listePagesSelected[listePagesSelected.length-1].present=1;
		listePagesSelected[listePagesSelected.length-1].reference=1;
		page_faults = page_faults+1;
		i=cpt; 
		cpt = cpt+1;
	}
	else
	{
		i = -1;
		listePagesSelected.pop();
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		} 
	}
}
else 
{
	if (blockNum.indexOf(page.id)==-1)
	{
		lfu = Math.min.apply(null,indexes); 
		val = indexes.indexOf(Math.min.apply(null,indexes));
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].present=1;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		}
		if (k!=listePagesSelected.length-1) listePagesSelected.pop(); 
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==blockNum[val]) 
			{
				trouv=true;
				listePagesSelected[k].present=0;
				//if (processes[k].modif==1) {}; //rien ? faire pour le moment
			}
			else k++;
		}
		blockNum[val]=page.id;
		indexes[val]=1;
		i = val;  
		page_faults = page_faults+1;
	}
	else
	{
		i = -1;
		listePagesSelected.pop();
		trouv=false;
		k = 0;
		while ((!trouv)&&(k<listePagesSelected.length))
		{
			if (listePagesSelected[k].id==page.id) 
			{
				trouv=true;
				listePagesSelected[k].reference=1;
				listePagesSelected[k].modif=page.modif;
			}
			else k++;
		}  
	}
}
//**************** FIN AGING **************//	
		};
        if (i != -1)
        {
        	trouv = false;k=0;
        	while (!trouv)
        	{
        		if (listePagesSelected[k].id == blockNum[i]) {trouv=true; listePagesSelected[k].case=i;}
        		else k++; 
        	}
        	block = this.head;
        	while (block!=null)
        	{
        		block.available = true;
        		block = block.next;
        	}
        	block = this.head;
        	if (i != 0)
        	{
        		for (var i1 = 0; i1 < i; i1++)
				{
					block = block.next;
				}
        	}
			block.setPage(page);
			page.allocatedBlock = block;
        }
        afficherTab(processusAct.listePages);
        return true;
	}

	this.add = function(block) {
		if (this.head == null) {
			this.head = block;
		} else {
			block.next = this.head;
			this.head.prev = block;
			this.head = block;
		};
		this.size += block.size;
	}

	this.repaint = function() {
		block = this.head;
		memoryDiv.innerHTML = "";
		for (i = 0 ; i < blockSizes.length ; i++)
		{
			height = ((block.size/heap.size)*100);
			divBlock = document.createElement("div");
			divBlock.style.height = (height + "%");
			divBlock.setAttribute("id", "block");
			if (block.available) {divBlock.className = "available";} else {divBlock.className = "unavailable";}
			memoryDiv.appendChild(divBlock);
			blockLabel = document.createElement("div");
			blockLabel.setAttribute("id", "blockLabel");
			blockLabel.style.height = (height + "%");
			if (meth == 2 || meth == 4 || meth == 5)
			{
				miniBlock = document.createElement("div");
				miniBlock.setAttribute("id", "miniBlock");
				miniBlock.style.height = ((height/2) + "%");
			}
			if (block.page == null) blockLabel.innerHTML = "Case Vide";
			else
			{
				blockLabel.innerHTML = "Page " + block.page.id;
				if (meth == 2 || meth == 4)
				{
					miniBlock.innerHTML = "Compteur: " +indexes[blockNum.indexOf(block.page.id)];
				}
				if (meth == 5)
				{
					miniBlock.innerHTML = "Compteur: " +indexes[blockNum.indexOf(block.page.id)].toString(2);
				}
			} 
			divBlock.appendChild(blockLabel);
			if (meth == 2 || meth == 4 || meth == 5) divBlock.appendChild(miniBlock);
			block = block.next;
		};
	};
};
setInterval(decalageCompteur,3000);
function decalageCompteur(){
	var meth=document.getElementById("mySelect").value;
	if (meth==5){
		for (k1=0;k1<indexes.length;k1++)
		{
				trouv=false;
				k = 0;
			while ((!trouv)&&(k<listePagesSelected.length))
			{
			if (listePagesSelected[k].id==blockNum[k1]) 
			{
				trouv=true;
			}
			else k++;
			}
				indexes[k1]= (indexes[k1]<<1)+listePagesSelected[k].reference;
				if (indexes[k1]<0){
					indexes[k1]=indexes[k1]<<1;
					indexes[k1]=indexes[k1]>>>1;
				} 
			}
	}
}
function afficherTab(listePages) { //  showcase the page table contained in listepages
	arrayDiv.innerHTML = "";
	array1Div.innerHTML = "";
	array2Div.innerHTML = "";
	array3Div.innerHTML = "";
	array4Div.innerHTML = "";
	$(function(){
			$("#arrayContainer").show();
			/*$("#arrayContainer").removeClass("waw1 waw2 waw3 waw4 waw5 waw6 waw7 waw8 waw9 waw10");
			if (listePages.length==1) {$("#arrayContainer").addClass("waw1"); $("button").addClass("waw11");}
			if (listePages.length==2) {$("#arrayContainer").addClass("waw2"); $("button").addClass("waw22");}
			if (listePages.length==3) {$("#arrayContainer").addClass("waw3"); $("button").addClass("waw33");}
			if (listePages.length==4) {$("#arrayContainer").addClass("waw4"); $("button").addClass("waw44");}
			if (listePages.length==5) {$("#arrayContainer").addClass("waw5"); $("button").addClass("waw55");}
			if (listePages.length==6) {$("#arrayContainer").addClass("waw6"); $("button").addClass("waw66");}
			if (listePages.length==7) {$("#arrayContainer").addClass("waw7"); $("button").addClass("waw77");}
			if (listePages.length==8) {$("#arrayContainer").addClass("waw8"); $("button").addClass("waw88");}
			if (listePages.length==9) {$("#arrayContainer").addClass("waw9"); $("button").addClass("waw99");}
			if (listePages.length==10) {$("#arrayContainer").addClass("waw10"); $("button").addClass("waw100");}*/
	});
	for (i = 0 ; i < listePages.length+1; i++)
	{
		page = listePages[i-1];
		height = (100/(listePages.length+1));
		/*******************************************/
		//create a div for each colon and each line
		divBlock = document.createElement("div");
		divBlock1 = document.createElement("div");
		divBlock2 = document.createElement("div");
		divBlock3 = document.createElement("div");
		divBlock4 = document.createElement("div");
		//change the height of the divs in style
		divBlock.style.height = ("45px");
		divBlock1.style.height = ("45px");
		divBlock2.style.height = ("45px");
		divBlock3.style.height = ("45px");
		divBlock4.style.height = ("45px");
		//append to the parent div
		arrayDiv.appendChild(divBlock);
		array1Div.appendChild(divBlock1);
		array2Div.appendChild(divBlock2);
		array3Div.appendChild(divBlock3);
		array4Div.appendChild(divBlock4);
		/*******************************************/
		//creat buttons for the pages
		blockLabel = document.createElement("button");
		blockLabel1 = document.createElement("button");
		blockLabel2 = document.createElement("button");
		blockLabel3 = document.createElement("button");
		blockLabel4 = document.createElement("button");
		if (i==0) blockLabel.setAttribute("class", "blockLabelArray");
		else
		{
			blockLabel.setAttribute("class", "blockLabelArrayBtn");
			blockLabel.setAttribute("onclick", "clicked(" + (i-1) + ")");	
		}
		blockLabel1.setAttribute("class", "blockLabelArray");
		blockLabel2.setAttribute("class", "blockLabelArray");
		blockLabel3.setAttribute("class", "blockLabelArray");
		if (i==0) blockLabel4.setAttribute("class", "blockLabelArray");
		else
		{
			blockLabel4.setAttribute("class", "blockLabelArrayBtn");
			blockLabel4.setAttribute("onclick", "modifClicked("+(i-1)+")");	
		}
		// write inside the button the page id
		blockLabel.setAttribute("id", "blockLabelArray"+i);
		blockLabel1.setAttribute("id", "blockLabelArray"+i+"1");
		blockLabel2.setAttribute("id", "blockLabelArray"+i+"2");
		blockLabel3.setAttribute("id", "blockLabelArray"+i+"3");
		blockLabel4.setAttribute("id", "blockLabelArray"+i+"4");
		blockLabel.style.height = ("45px");
		blockLabel1.style.height = ("45px");
		blockLabel2.style.height = ("45px");
		blockLabel3.style.height = ("45px");
		blockLabel4.style.height = ("45px");
		if (i==0)
		{
			//the main colon
			blockLabel.innerHTML = "Page Id";
			blockLabel1.innerHTML = "Case";
			blockLabel2.innerHTML = "Bit ref";
			blockLabel3.innerHTML = "Bit pre";
			blockLabel4.innerHTML = "Bit modif";
		}
		else 
		{
			blockLabel.innerHTML = "Page " + page.id;
			blockLabel1.innerHTML = page.case;
			blockLabel2.innerHTML = page.reference;
			blockLabel3.innerHTML = page.present;
			blockLabel4.innerHTML = page.modif;
		}
		divBlock.appendChild(blockLabel);
		divBlock1.appendChild(blockLabel1);
		divBlock2.appendChild(blockLabel2);
		divBlock3.appendChild(blockLabel3);
		divBlock4.appendChild(blockLabel4);
	}
};

function existanceProcessus(numSecteur, numPiste) { //a function returns true in process is in secteur
	trouv = false;
	i = 0;
	while ((!trouv) && (i<listeProcessus.length))
	{
		if ((listeProcessus[i].piste==numPiste) && (listeProcessus[i].secteur==numSecteur)) trouv = true;
		else i++;
	}
	return trouv;
};

function ProcessusID(numSecteur, numPiste) { //returns page id of the process in the secteur and pist
	trouv = false;
	i = 0;
	while ((!trouv) && (i<listeProcessus.length))
	{
		if ((listeProcessus[i].piste==numPiste) && (listeProcessus[i].secteur==numSecteur)) return listeProcessus[i].id;
		else i++;
	}
};

function ProcessusByCO(numSecteur, numPiste) {
	trouv = false;
	i = 0;
	while ((!trouv) && (i<listeProcessus.length))
	{
		if ((listeProcessus[i].piste==numPiste) && (listeProcessus[i].secteur==numSecteur)) return listeProcessus[i];
		else i++;
	}
};

function tableInputKeyPress(e) {
	e=e||window.event;
	var key = e.keyCode;
	if(key==13) //Enter
	{
	   sbmt();
	   return false; //return true to submit, false to do nothing
	}
}
// Handle front-end process submission
var changeColor=function (chart,piste ,sectuer) {
	//chart.data.labels.push(label);
  var i=0;

    chart.data.datasets.forEach((dataset) => {
		if ((i++)==piste){
      //dataset.data[sectuer].legend.display=true;
			dataset.backgroundColor[sectuer]='rgb(43, 255, 0)';
		}
    });
    chart.update();
}

var sbmt=function() { // a function to read input from the text field
	var ths=document.getElementById("processForm");
	meth=document.getElementById("mySelect").value;
	elements = ths.elements;

	inProcessId = elements.namedItem("processId");
	inPageNumber = elements.namedItem("pageNumber");

	if (meth>0)
	{	
		if (nbPiste!=3)
		{
			if ((parseInt(inPageNumber.value)<=10) && (parseInt(inPageNumber.value)>0))  
			{
				//read the number of pages 
				processus = new Processus(inProcessId.value,parseInt(inPageNumber.value));
				listeProcessus.push(processus);
				changeColor(chart1,processus.piste,processus.secteur);
			}
			else alert("Le nombre de pages doit etre entre 1 et 10 !");
		}
  		else alert("La mémoire secondaire est pleine");
  	}
  	else 
  	{
  		alert("Veuiller choisir une méthode de remplacement");
  	}
	inPageNumber.value = "";
	inProcessId.value = "";
};

//////////////////////////main/////////////////////////////
var memoryDiv = document.getElementById("memory");
var arrayDiv = document.getElementById("array");
var array1Div = document.getElementById("array1");
var array2Div = document.getElementById("array2");
var array3Div = document.getElementById("array3");
var array4Div = document.getElementById("array4");

// Remplacement variables //
page_faults = 0;
cpt = 0;
cycle = 0;
var pageEnCours = false;
var memControlBlockSize = 0;
var blockNum = [];
var indexes = [];
var processesPageId = [];
var meth = 0;
var defautPage=document.getElementById("def");
//initialize the variables
pageId = 0;
nbPiste = 0;
nbSecteur = 0;
pageSize = 16;
var listeProcessus = [];
var processusAct = null;
var listePagesSelected = [];
var listePagesSelected1 = [];
var firsttime=true;
heap = new Heap();
blockSizes = [16,16,16];
capacity = blockSizes.length;
for (var i = 0; i < capacity; i++) {
	blockNum.push(-1);
}
// add blocks to the heap
for (i=0; i<blockSizes.length; i++) {
	heap.add(new MemControlBlock());
};
heap.repaint();
// set interval to create time space between instruction
var clock = setInterval(function() 
{
	for (i=0; i<listePagesSelected.length; i++) 
	{
		page = listePagesSelected[i];
		if (!page.isAllocated()) heap.requestAllocation(page);
	};
	heap.repaint();
	defautPage.innerHTML="Défaut de page: "+page_faults;	
});


$(".fa").addClass('left');
var x = window.matchMedia("(max-width: 915px)"); 
leftTOup(x);
// change the image of the arrow from left to up
function leftTOup(x){
	
	if (x.matches) {
		{
			if($(".fa").hasClass('right'))
		{
			$(".fa").removeClass('right');
			$(".fa").addClass('up');
		}
		else
		{
			$(".fa").removeClass('left');
			$(".fa").addClass('down');
		}
	}
}
}
// change the image of the arrow from up to left
function upTOleft(x){
	
	if (x.matches) {
		{
			if($(".fa").hasClass('up'))
		{
			$(".fa").removeClass('up');
			$(".fa").addClass('right');
		}
		else
		{
			$(".fa").removeClass('down');
			$(".fa").addClass('left');
		}
	}
}
}
var y=window.matchMedia("(min-width: 401px)");
y.addListener(upTOleft);
x.addListener(leftTOup);
