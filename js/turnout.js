function checkOnly(option,event){
	var checkbox=option.parentNode.previousElementSibling;
	var id=checkbox.getAttribute("id");
	if(checkbox.getAttribute("checked")=="unchecked"){

		checkbox.click();
	}
	d3.selectAll(".checkbox").each(function(){
		if (this.getAttribute("id")!=id){

			if (this.getAttribute("checked")=="checked")
				this.click();
		}
	});
	event.preventDefault();

}

function showtool(){
	mouse=d3.mouse(this);

	var consti=".a"+d3.select(this).data()[0].properties["AC_NO"];


	d3.selectAll(consti).each(function(){

		d3.select(this).style("stroke-width","1");
	});
	var g_turnout=d3.select(".turnout.toviz");
	var g_bjp=d3.select(".bjp.toviz");
	var g_inc=d3.select(".inc.toviz");
	var g_sp=d3.select(".sp.toviz");
	var g_bsp=d3.select(".bsp.toviz");
	var glist=[g_turnout,g_bjp,g_inc,g_sp,g_bsp];
	d3.selectAll(".description").each(function(){
		d3.select(this).selectAll("text").remove();
	});

	var year=document.getElementById("year_dropdown").dataset.oldValue;

	g_turnout.select(".description").append("text").text(d3.select(this).data()[0].properties["AC_NAME"]).attr("x",5).attr("y",15).style("font-size","13px").style("font-weight","600").style("fill",party_colors["Turnout"]);

	g_turnout.select(".description").append("text").text("Turnout: "+(Math.round(d3.select(this).data()[0].properties["Turnout"+year]*100)/100)+"%").attr("x",5).attr("y",35).style("font-size","12px").style("font-weight","400")

	//g_turnout.select(".description").append("text").text(d3.select(this).data()[0].properties["Turnout"+year]+"%").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");

	for (var i=1;i<glist.length;i++){
		var line="";
		var party=glist[i].attr("party");
		var votes=d3.select(this).data()[0].properties[party+year];
		var win_votes=d3.select(this).data()[0].properties["W_V"+year];
		var win_party=d3.select(this).data()[0].properties["W_P"+year];
		var runnerup_party=d3.select(this).data()[0].properties["RU_P"+year];
		var runnerup_votes=d3.select(this).data()[0].properties["RU_V"+year];

		var margin=Math.abs(+votes-(+win_votes))==0?+votes-(+runnerup_votes):Math.abs(+votes-(+win_votes));
		if(party==win_party){
			glist[i].select(".description").append("text").text(party).attr("x",5).attr("y",15).style("font-size","13px").style("font-weight","600").style("fill",party_colors[party]);
			glist[i].select(".description").append("text").text(d3.select(this).data()[0].properties["AC_NAME"]).attr("x",5).attr("y",30).style("font-size","13px");
			if(votes!="NA"){
				glist[i].select(".description").append("text").text("Winner").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
				glist[i].select(".description").append("text").text("Margin of victory : "+margin).attr("x",5).attr("y",56).style("font-size","12px").style("font-weight","400");
			}
			else
			{
				glist[i].select(".description").append("text").text("Did Not Contest").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
			}
		}
		else if(party==runnerup_party){
			glist[i].select(".description").append("text").text(party).attr("x",5).attr("y",15).style("font-size","12px").style("font-weight","600").style("fill",party_colors[party]);
			glist[i].select(".description").append("text").text(d3.select(this).data()[0].properties["AC_NAME"]).attr("x",5).attr("y",30).style("font-size","13px");
			if(votes!="NA"){
				glist[i].select(".description").append("text").text("Runner Up").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
				glist[i].select(".description").append("text").text("Margin of loss : "+margin).attr("x",5).attr("y",56).style("font-size","12px").style("font-weight","400");
			}
			else
			{
				glist[i].select(".description").append("text").text("Did Not Contest").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
			}
		}
		else{
			glist[i].select(".description").append("text").text(party).attr("x",5).attr("y",15).style("font-size","12px").style("font-weight","600").style("fill",party_colors[party]);
			glist[i].select(".description").append("text").text(d3.select(this).data()[0].properties["AC_NAME"]).attr("x",5).attr("y",30).style("font-size","13px");
			if(votes!="NA"){
				glist[i].select(".description").append("text").text("Third or Below").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
				glist[i].select(".description").append("text").text("Margin of loss : "+margin).attr("x",5).attr("y",56).style("font-size","12px").style("font-weight","400");
			}
			else
			{
				glist[i].select(".description").append("text").text("Did Not Contest").attr("x",5).attr("y",43).style("font-size","12px").style("font-weight","400");
			}
		}
		//var votes=d3.select(this).data()[0].properties[]


	}

	if(this.parentNode.getAttribute("class")=="turnout toviz")
	{
		g_turnout.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]+10)+","+(mouse[1]-65)+")"})
		.classed("hidden",false);
		g_bjp.select(".tool")
		.attr("transform",function(){return "translate("+((mouse[0]+5)/2-110)+","+((mouse[1]-20)/2-56)+")";})
		.classed("hidden",false);
		g_inc.select(".tool")
		.attr("transform",function(){return "translate("+((mouse[0]+5)/2-110)+","+((mouse[1]-20)/2-56)+")";})
		.classed("hidden",false);
		g_sp.select(".tool")
		.attr("transform",function(){return "translate("+((mouse[0]+5)/2-110)+","+((mouse[1]-20)/2-56)+")";})
		.classed("hidden",false);
		g_bsp.select(".tool")
		.attr("transform",function(){return "translate("+((mouse[0]+5)/2-110)+","+((mouse[1]-20)/2-56)+")";})
		.classed("hidden",false);
	}
	else{
		g_turnout.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]*1.7)+","+(mouse[1]*2-100)+")"})
		.classed("hidden",false);
		g_bjp.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]-110)+","+(mouse[1]-78)+")"})
		.classed("hidden",false);
		g_inc.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]-110)+","+(mouse[1]-78)+")"})
		.classed("hidden",false);
		g_sp.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]-110)+","+(mouse[1]-78)+")"})
		.classed("hidden",false);
		g_bsp.select(".tool")
		.attr("transform",function(){return "translate("+(mouse[0]-110)+","+(mouse[1]-78)+")"})
		.classed("hidden",false);
	}

}

function toggle(option){

	var tocheckornottocheck=(option.getAttribute("checked")=="unchecked")?"checked":"unchecked";
	option.setAttribute("checked",tocheckornottocheck);

	Array.from(document.getElementsByClassName(option.value)).forEach(function(element){
		element.classList.toggle("hideconsti");
	});
}

function makeviz(year){
	if (year.value=="07"){
		oldmaps(year.value);
	}
	else
	{
		newmaps(year.value);
	}
}


function newmaps(year){
	d3.json("map/uptopo.json", function(error, up) {
		if (error) throw error;

		var geo_obj=topojson.feature(up,up.objects.up);

		var width=1000;
		var height=600;
		var padding=20;

		var projection_small=d3.geoMercator()
		.fitSize([(width/3.5-padding),(width/3.5-padding)],geo_obj);

		var projection_big=d3.geoMercator()
		.fitSize([(width/2-padding),(width/2-padding)],geo_obj);

		var path_small = d3.geoPath().projection(projection_small);
		var path_big=d3.geoPath().projection(projection_big);

		var g_turnout=d3.select(".turnout.toviz");
		var g_bjp=d3.select(".bjp.toviz");;
		var g_inc=d3.select(".inc.toviz");;
		var g_sp=d3.select(".sp.toviz");;
		var g_bsp=d3.select(".bsp.toviz");;

		var loss_scale=d3.scaleLinear()
		.domain([-230000,-171])
		.range(["#222","#ddd"]);

		var tout_scale= d3.scaleQuantize()
		.domain([30,100])
		.range(['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']);

		var bjp_col_scale= d3.scaleLinear()
		.domain([0,151000])
		.range(['#ffd296',party_colors["BJP"]]);

		var inc_col_scale= d3.scaleLinear()
		.domain([4000,89200])
		.range(['#b6deef',party_colors["INC"]]);

		var sp_col_scale= d3.scaleLinear()
		.domain([0,82000])
		.range(['#f9869d',party_colors["SP"]]);

		var bsp_col_scale= d3.scaleLinear()
		.domain([0,53000])
		.range(['#c2f796',party_colors["BSP"]]);

		var previous=document.getElementById("year_dropdown").dataset.oldValue;
		document.getElementById("year_dropdown").dataset.oldValue=year;
		var svg=d3.select("#tout_chart_container");

		var g_turnout;
		var g_bjp;
		var g_inc;
		var g_sp;
		var g_bsp;

		if(document.getElementById("year_dropdown").dataset.firstRun==="true" || previous==="07")
		{

			d3.select("#tout_chart_container").remove();
			svg = d3.select(".toviz").append("svg").attr("width",1250).attr("height",height).attr("id","tout_chart_container");
			g_turnout=svg.append("g").attr("width",width/2).attr("height",height).attr("class","turnout toviz").attr("transform","translate(0,0)");
			g_bjp=svg.append("g").attr("width",width/4).attr("height",(height/2)).attr("class","bjp toviz").attr("transform","translate(600,0)").attr("party","BJP");
			g_inc=svg.append("g").attr("width",width/4).attr("height",(height/2)).attr("class","inc toviz").attr("transform","translate(950,0)").attr("party","INC");
			g_sp=svg.append("g").attr("width",width/4).attr("height",(height/2)).attr("class","sp toviz").attr("transform","translate(600,300)").attr("party","SP");
			g_bsp=svg.append("g").attr("width",width/4).attr("height",(height/2)).attr("class","bsp toviz").attr("transform","translate(950,300)").attr("party","BSP");

			g_turnout.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("d",path_big)
			.attr("class",function(d){
				return "a"+d.properties["AC_NO"];
			})
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			legend_cols=["#888","#bbb","#ddd","#fff"];

			var glist=[g_turnout,g_bjp,g_inc,g_sp,g_bsp];
			var reflist=["Turnout","BJP","INC","SP","BSP"];
			var party_midcolors=['#ffd296',"#fcc376",'#b6deef',"#6bb9db",'#f9869d',"#e23d5e",'#c2f796',"#9ad868"];
			var tout_colors=['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b'];

			g_turnout.append("text").text("VOTER TURNOUT").attr("transform",function(){return "translate("+(width/2-150)+",20)"}).attr("class","map_label").style("fill",party_colors["Turnout"]).attr("text-anchor","middle");

			for(var j=0;j<7;j++)
			{
				glist[0].append("rect").attr("width",10).attr("height",10).attr("x",(width/2-185)+10*j).attr("y",30).style("fill",tout_colors[j]).style("stroke-width","0.2px").style("stroke","black");
			}

			glist[0].append("text").text("Low").attr("transform",function(){return "translate("+((width/2-185))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			//glist[0].append("text").text("Turnout").attr("transform",function(){return "translate("+((width/2-175))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			glist[0].append("text").text("High").attr("transform",function(){return "translate("+((width/2-115))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			//glist[0].append("text").text("Turnout").attr("transform",function(){return "translate("+((width/2-125))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");



			for(var i=1;i<glist.length;i++){

				glist[i].append("text").text(reflist[i]).attr("transform",function(){return "translate("+((width/4-55))+","+(20)+")";}).attr("class","map_label").attr("text-anchor","middle").style("fill",party_colors[reflist[i]]);

				glist[i].append("text").text("High Loss").attr("transform",function(){return "translate("+((width/4-84))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("Margin").attr("transform",function(){return "translate("+((width/4-84))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("High Victory").attr("transform",function(){return "translate("+((width/4-24))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("Margin").attr("transform",function(){return "translate("+((width/4-24))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				for(var j=0;j<4;j++)
					glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+10*j).attr("y",30).style("fill",legend_cols[j]).style("stroke-width","0.2px").style("stroke","black");

			}

			for(var i=1;i<glist.length;i++){

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+40).attr("y",30).style("fill",party_midcolors[2*(i-1)]).style("stroke-width","0.2px").style("stroke","black");

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+50).attr("y",30).style("fill",party_midcolors[2*i-1]).style("stroke-width","0.2px").style("stroke","black");

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+60).attr("y",30).style("fill",party_colors[reflist[i]]).style("stroke-width","0.2px").style("stroke","black");
			}


			g_bjp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BJP") return "a"+d.properties["AC_NO"]+"won";
				else if(d.properties["RU_P"+year]=="BJP") return "a"+d.properties["AC_NO"]+"runnerup";
				else return "a"+d.properties["AC_NO"]+"third";
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_inc.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="INC")
					return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="INC")
					return "runnerup"+" a"+d.properties["AC_NO"];
				else
					return "third"+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_sp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				return "a"+d.properties["AC_NO"];
			})
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="SP") return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="SP") return "runnerup"+" a"+d.properties["AC_NO"];
				else return "third"+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_bsp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				return "a"+d.properties["AC_NO"];
			})
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BSP") return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="BSP") return "runnerup"+" a"+d.properties["AC_NO"];
				else return "third"+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});
			document.getElementById("year_dropdown").dataset.firstRun="false";
		}

		var t = d3.transition()
		.duration(250)
		.ease(d3.easeLinear);

		g_turnout=d3.select(".turnout.toviz");
		g_bjp=d3.select(".bjp.toviz");
		g_inc=d3.select(".inc.toviz");
		g_sp=d3.select(".sp.toviz");
		g_bsp=d3.select(".bsp.toviz");

		d3.selectAll("g.toviz").each(function(){
			var tool=d3.select(this).append("g").attr("class","tool hidden");
			tool.append("g").attr("class","description")
			.append("rect")
			.attr("width","150")
			.attr("height",65);
		});

		//g_turnout.append("rect").attr("class","overlay")
		//.attr("width",width/2)
		//.attr("height",(height-padding));
//
		//g_bjp.append("rect").attr("class","overlay")
		//.attr("width",width/4)
		//.attr("height",(height/2-padding));
//
		//g_inc.append("rect").attr("class","overlay")
		//.attr("width",width/4)
		//.attr("height",(height/2-padding));
//
		//g_sp.append("rect").attr("class","overlay")
		//.attr("width",width/4)
		//.attr("height",(height/2-padding));
//
		//g_bsp.append("rect").attr("class","overlay")
		//.attr("width",width/4)
		//.attr("height",(height/2-padding));


		g_turnout.selectAll("path")
		.each(function(d,i){
			d3.select(this)
			.attr("class",function(d){
				return "a"+d.properties["AC_NO"];
			})
			.transition(t)
			.style("fill",function(d){
				return tout_scale(+d.properties["Turnout"+year]);
			});
		});

		g_bjp.selectAll("path").each(function(){
			d3.select(this)
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BJP")
					return "won "+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="BJP")
					return "runnerup "+" a"+d.properties["AC_NO"];
				else
					return "third "+" a"+d.properties["AC_NO"];
			})
			.transition(t)
			.style("fill",function(d){
				if (d.properties["BJP"+year]=="NA") return "#aaa";
				else
					return +d.properties["BJP"+year]-(+d.properties["W_V"+year])==0?bjp_col_scale(+d.properties["BJP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["BJP"+year]-(+d.properties["W_V"+year])));
			});
		});
		g_inc.selectAll("path").each(function(){
			d3.select(this)
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="INC")
					return "won "+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="INC")
					return "runnerup "+" a"+d.properties["AC_NO"];
				else
					return "third "+" a"+d.properties["AC_NO"];
			})
			.transition(t)
			.style("fill",function(d){
				if (d.properties["INC"+year]=="NA") return "#aaa";
				else
					return +d.properties["INC"+year]-(+d.properties["W_V"+year])==0?inc_col_scale(+d.properties["INC"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["INC"+year]-(+d.properties["W_V"+year])));
			});;
		});
		g_sp.selectAll("path").each(function(){
			d3.select(this)
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="SP") return "won "+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="SP") return "runnerup "+" a"+d.properties["AC_NO"];
				else return "third "+" a"+d.properties["AC_NO"];
			})
			.transition(t)
			.style("fill",function(d){
				if (d.properties["SP"+year]=="NA") return "#aaa";
				else
					return +d.properties["SP"+year]-(+d.properties["W_V"+year])==0?sp_col_scale(+d.properties["SP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["SP"+year]-(+d.properties["W_V"+year])));
			});
		});
		g_bsp.selectAll("path").each(function(){
			d3.select(this)
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BSP") return "won "+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="BSP") return "runnerup "+" a"+d.properties["AC_NO"];
				else return "third "+" a"+d.properties["AC_NO"];
			})
			.transition(t)
			.style("fill",function(d){
				if (d.properties["BSP"+year]=="NA") return "#aaa";
				else
					return +d.properties["BSP"+year]-(+d.properties["W_V"+year])==0?bsp_col_scale(+d.properties["BSP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["BSP"+year]-(+d.properties["W_V"+year])));
			});

		});


		Array.from(document.getElementsByClassName("checkbox")).forEach(function(element){
			if(element.getAttribute("checked")=="unchecked")
			{
				element.classList.toggle("hideconsti");
			}
		});

		d3.selectAll(".checkbox").each(function(){
			checkbox=d3.select(this);
			if(checkbox.attr("checked")=="unchecked")
			{

				toggle(this);
				checkbox.attr("checked","unchecked");
			}
		});
	});

}

function oldmaps(year){

	d3.json("map/uptopoold.json", function(error, up) {

		var previous=document.getElementById("year_dropdown").dataset.oldValue;
		document.getElementById("year_dropdown").dataset.oldValue=year;

		d3.select("#tout_chart_container").remove();

		var t = d3.transition()
		.duration(250)
		.ease(d3.easeLinear);

		if (error) throw error;

		var geo_obj=topojson.feature(up,up.objects.up);

		var width=1000;
		var height=600;
		var padding=20;

		var projection_small=d3.geoMercator()
		.fitSize([(width/3.5-padding),(width/3.5-padding)],geo_obj);

		var projection_big=d3.geoMercator()
		.fitSize([(width/2-padding),(width/2-padding)],geo_obj);

		var path_small = d3.geoPath().projection(projection_small);
		var path_big=d3.geoPath().projection(projection_big);

		var g_turnout=d3.select(".turnout.toviz");
		var g_bjp=d3.select(".bjp.toviz");;
		var g_inc=d3.select(".inc.toviz");;
		var g_sp=d3.select(".sp.toviz");;
		var g_bsp=d3.select(".bsp.toviz");;

		var loss_scale=d3.scaleLinear()
		.domain([-230000,-171])
		.range(["#222","#ddd"]);

		var tout_scale= d3.scaleQuantize()
		.domain([30,100])
		.range(['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']);

		var bjp_col_scale= d3.scaleLinear()
		.domain([0,151000])
		.range(['#ffd296',party_colors["BJP"]]);

		var inc_col_scale= d3.scaleLinear()
		.domain([4000,89200])
		.range(['#b6deef',party_colors["INC"]]);

		var sp_col_scale= d3.scaleLinear()
		.domain([0,82000])
		.range(['#f9869d',party_colors["SP"]]);

		var bsp_col_scale= d3.scaleLinear()
		.domain([0,53000])
		.range(['#c2f796',party_colors["BSP"]]);



		d3.select("#tout_chart_container").remove();
		svg = d3.select(".toviz").append("svg").attr("width",1250).attr("height",height).attr("id","tout_chart_container");
		g_turnout=svg.append("g").attr("width",width/2).attr("height",height).attr("class","turnout toviz").attr("transform","translate(0,0)");
		g_bjp=svg.append("g").attr("width",width/4).attr("height",(height)).attr("class","bjp toviz").attr("transform","translate(600,0)").attr("party","BJP");
		g_inc=svg.append("g").attr("width",width/4).attr("height",(height)).attr("class","inc toviz").attr("transform","translate(950,0)").attr("party","INC");
		g_sp=svg.append("g").attr("width",width/4).attr("height",(height)).attr("class","sp toviz").attr("transform","translate(600,300)").attr("party","SP");
		g_bsp=svg.append("g").attr("width",width/4).attr("height",(height)).attr("class","bsp toviz").attr("transform","translate(950,300)").attr("party","BSP");


		legend_cols=["#888","#bbb","#ddd","#fff"];

		var glist=[g_turnout,g_bjp,g_inc,g_sp,g_bsp];
		var reflist=["Turnout","BJP","INC","SP","BSP"];
		var party_midcolors=['#ffd296',"#fcc376",'#b6deef',"#6bb9db",'#f9869d',"#e23d5e",'#c2f796',"#9ad868"];
		var tout_colors=['#edf8fb','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b'];

		g_turnout.append("text").text("VOTER TURNOUT").attr("transform",function(){return "translate("+(width/2-150)+",20)"}).attr("class","map_label").style("fill",party_colors["Turnout"]).attr("text-anchor","middle");

		for(var j=0;j<7;j++)
		{
			glist[0].append("rect").attr("width",10).attr("height",10).attr("x",(width/2-185)+10*j).attr("y",30).style("fill",tout_colors[j]).style("stroke-width","0.2px").style("stroke","black");
		}

		glist[0].append("text").text("Low").attr("transform",function(){return "translate("+((width/2-185))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			//glist[0].append("text").text("Turnout").attr("transform",function(){return "translate("+((width/2-175))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			glist[0].append("text").text("High").attr("transform",function(){return "translate("+((width/2-115))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");
			//glist[0].append("text").text("Turnout").attr("transform",function(){return "translate("+((width/2-125))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");



			for(var i=1;i<glist.length;i++){

				glist[i].append("text").text(reflist[i]).attr("transform",function(){return "translate("+((width/4-55))+","+(20)+")";}).attr("class","map_label").attr("text-anchor","middle").style("fill",party_colors[reflist[i]]);

				glist[i].append("text").text("High Loss").attr("transform",function(){return "translate("+((width/4-84))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("Margin").attr("transform",function(){return "translate("+((width/4-84))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("High Victory").attr("transform",function(){return "translate("+((width/4-24))+","+(50)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				glist[i].append("text").text("Margin").attr("transform",function(){return "translate("+((width/4-24))+","+(60)+")";}).attr("class","map_label_small").attr("text-anchor","middle");

				for(var j=0;j<4;j++)
					glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+10*j).attr("y",30).style("fill",legend_cols[j]).style("stroke-width","0.2px").style("stroke","black");

			}

			for(var i=1;i<glist.length;i++){

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+40).attr("y",30).style("fill",party_midcolors[2*(i-1)]).style("stroke-width","0.2px").style("stroke","black");

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+50).attr("y",30).style("fill",party_midcolors[2*i-1]).style("stroke-width","0.2px").style("stroke","black");

				glist[i].append("rect").attr("width",10).attr("height",10).attr("x",(width/4-90)+60).attr("y",30).style("fill",party_colors[reflist[i]]).style("stroke-width","0.2px").style("stroke","black");
			}



			g_turnout.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				return "a"+d.properties["AC_NO"];
			})
			.attr("d",path_big)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_bjp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BJP") return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="BJP") return "runnerup "+" a"+d.properties["AC_NO"];
				else return "third "+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_inc.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="INC") return "won "+"a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="INC") return "runnerup "+"a"+d.properties["AC_NO"];
				else return "third "+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_sp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="SP") return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="SP") return "runnerup"+" a"+d.properties["AC_NO"];
				else return "third "+"a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});

			g_bsp.selectAll("path")
			.data(geo_obj.features)
			.enter().append("path")
			.attr("class",function(d){
				if (d.properties["W_P"+year]=="BSP") return "won"+" a"+d.properties["AC_NO"];
				else if(d.properties["RU_P"+year]=="BSP") return "runnerup"+" a"+d.properties["AC_NO"];
				else return "third "+" a"+d.properties["AC_NO"];
			})
			.attr("d", path_small)
			.on("mouseover",showtool)
			.on("mouseout",function(d){
				consti=".a"+d.properties["AC_NO"];
				d3.selectAll(".tool").each(function(){
					d3.select(this).classed("hidden",true);
					d3.selectAll(consti).each(function(){d3.select(this).style("stroke-width","0.2");});
				});
			});


			d3.selectAll("g.toviz").each(function(){
				var tool=d3.select(this).append("g").attr("class","tool hidden");
				tool.append("g").attr("class","description")
				.append("rect")
				.attr("width",150)
				.attr("height",65);
			});

			g_turnout.selectAll("path")
			.each(function(d,i){
				d3.select(this)
				.transition(t)
				.style("fill",function(d){
					return tout_scale(+d.properties["Turnout"+year]);
				});
			});

			g_bjp.selectAll("path").each(function(){
				d3.select(this)
				.transition(t)
				.style("fill",function(d){
					if (d.properties["BJP"+year]=="NA") return "#aaa";
					else
						return +d.properties["BJP"+year]-(+d.properties["W_V"+year])==0?bjp_col_scale(+d.properties["BJP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["BJP"+year]-(+d.properties["W_V"+year])));
				});
			});

			g_inc.selectAll("path").each(function(){
				d3.select(this)
				.transition(t)
				.style("fill",function(d){
					if (d.properties["INC"+year]=="NA") return "#aaa";
					else
						return +d.properties["INC"+year]-(+d.properties["W_V"+year])==0?inc_col_scale(+d.properties["INC"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["INC"+year]-(+d.properties["W_V"+year])));
				});;
			});

			g_sp.selectAll("path").each(function(){
				d3.select(this)
				.transition(t)
				.style("fill",function(d){
					if (d.properties["SP"+year]=="NA") return "#aaa";
					else
						return +d.properties["SP"+year]-(+d.properties["W_V"+year])==0?sp_col_scale(+d.properties["SP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["SP"+year]-(+d.properties["W_V"+year])));
				});
			});

			g_bsp.selectAll("path").each(function(){
				d3.select(this)
				.transition(t)
				.style("fill",function(d){
					if (d.properties["BSP"+year]=="NA") return "#aaa";
					else
						return +d.properties["BSP"+year]-(+d.properties["W_V"+year])==0?bsp_col_scale(+d.properties["BSP"+year]-(+d.properties["RU_V"+year])):loss_scale((+d.properties["BSP"+year]-(+d.properties["W_V"+year])));
				});

			});

			d3.selectAll(".checkbox").each(function(){
				checkbox=d3.select(this);
				if(checkbox.attr("checked")=="unchecked")
				{
					toggle(this);
					checkbox.attr("checked","unchecked");
				}
			});

		});
}
