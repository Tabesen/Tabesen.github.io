//HTML ("index.html") und Skript ("map.js") wurden jetzt getrennt.

window.onload = function() { //skript wird erst geladen, wenn Rest der Seite komplett geladen ist	
	
	
        // WMTS-Layer basemap.at - Quelle: http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        var layers = {
            geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
            }),
            osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
        };

        // Karte definieren
        var map = L.map('map', {
            layers: [layers.geolandbasemap],
            center : [47.654, 13.370],
            zoom : 8
        });

        // Maßstab hinzufügen
        L.control.scale({
            maxWidth: 200,
            metric: true,
            imperial: false
        }).addTo(map);
		

        // WMTS-Layer Auswahl hinzufügen
        var layerControl = L.control.layers({
            "basemap.at - STANDARD": layers.geolandbasemap,
            "basemap.at - GRAU": layers.bmapgrau,
            "basemap.at - OVERLAY": layers.bmapoverlay,
            "basemap.at - HIGH-DPI": layers.bmaphidpi,
            "basemap.at - ORTHOFOTO": layers.bmaporthofoto30cm,
            "OpenStreetMap": layers.osm,
        }).addTo(map);

        // leaflet-hash aktivieren
        var hash = new L.Hash(map);
		
		//dieses Elevation dings macht das (leere) Diagramm auf
			var profil = L.control.elevation({
			position : 'bottomright',
			});
			profil.addTo(map);
			
			//ohne das hier ist das Diagramm (s. eins drüber) aber leer
			//L.geoJSON(window.etappe07, {
			//onEachFeature: profil.addData.bind(profil)
			//}).addTo(map);
		
		//Etappe laden (erfüllt gleiche Funktion wie "GPX Track laden" eins weiter unten)
		//L.geoJSON(window.etappe07).addTo(map);
		
		//***********function loadTrack(track){
			
		//Funktion zum Laden eines Tracks
		function loadTrack(track) {
			//Etappeninfo anzeigen
				//console.log("etappeninfo: ", window.ETAPPENINFO);
				//console.log("gpx", window.TOURENINFO[track]);
				//console.log("kurztext: ", window.ETAPPENINFO[track].Kurztext);
				document.getElementById("Titel").innerHTML = window.TOURENINFO[track].Titel;
				document.getElementById("Kurztext").innerHTML = window.TOURENINFO[track].Kurztext;
				document.getElementById("ArtderTour").innerHTML = window.TOURENINFO[track].ArtderTour;
				document.getElementById("Tourenbeschreibung").innerHTML = window.TOURENINFO[track].Tourenbeschreibung;
				document.getElementById("Start").innerHTML = window.TOURENINFO[track].Start;
				document.getElementById("Ziel").innerHTML = window.TOURENINFO[track].Ziel;
				document.getElementById("auf").innerHTML = window.TOURENINFO[track].auf;
				document.getElementById("ab").innerHTML = window.TOURENINFO[track].ab;
				document.getElementById("HoechsterPunkt").innerHTML = window.TOURENINFO[track].HoechsterPunkt;
				document.getElementById("Schwierigkeit").innerHTML = window.TOURENINFO[track].Schwierigkeit;
				document.getElementById("Laenge").innerHTML = window.TOURENINFO[track].Laenge;
				document.getElementById("Zeit").innerHTML = window.TOURENINFO[track].Zeit;
				document.getElementById("Einkehr").innerHTML = window.TOURENINFO[track].Einkehr;
				document.getElementById("Einkehr1").innerHTML = window.TOURENINFO[track].Einkehr1;
				document.getElementById("EinkehrHomepage").innerHTML = window.TOURENINFO[track].EinkehrHomepage;
				document.getElementById("Einkehr1Homepage").innerHTML = window.TOURENINFO[track].Einkehr1Homepage;
				document.getElementById("Parkplatz").innerHTML = window.TOURENINFO[track].Parkplatz;
				document.getElementById("Gebirgszug").innerHTML = window.TOURENINFO[track].Gebirgszug;
				document.getElementById("specials").innerHTML = window.TOURENINFO[track].specials;
				document.getElementById("specialsWebsite").innerHTML = window.TOURENINFO[track].specialsWebsite;
				document.getElementById("specials1").innerHTML = window.TOURENINFO[track].specials1;
				document.getElementById("specials1Website").innerHTML = window.TOURENINFO[track].specials1Website;
				document.getElementById("Quelle").innerHTML = window.TOURENINFO[track].Quelle;
				
				
				
			//var ohneGPX = track.substring(0, track.length-4);
			//var ohneGPX2 = track.replace(".gpx", "");
			//console.log("track ", ohneGPX, ohneGPX2);
			//console.log("etappeninfo: ", window.ETAPPENINFO[ohneGPX]);
		
		//bestehenden Track, farbige Linie mit Steigung und Profil löschen
			//gpxTrack.clearLayers();
			//coloredLineGroup.clearLayers();
			//profil.clear();
			//******************
	 
			
			 // GPX Track laden
			gpxTrack = omnivore.gpx('bikedata/'+track).addTo(map);
			
			// HUHUUUUUUUUUUUUUUUUUUUUUUUUUUUUU Matze:), könntest du hier auch noch mal schauen? Wie bekommen wir es hin, dass Popups beim "drauf clicken" der jeweiligen Tour erscheinen zu lassen, mit den Daten: Titel, Länge, Zeit, Schwierigkeit und vllt. später noch einem Bild (müssen nach den Bildern, aber erst noch schauen)
			
			//Popup hinzufügen
			//var markup = '<div id="Titel"></div>';
			//gpxTrack.bindPopup(markup, { maxWidth : 450 });
	
			
			// Popup hinzufügen
				//var markup = '<h3><div id="Titel"></div></h3>';
				//markup += '<li><p><div id="Zeit"></div></p>';
				//markup += '<li><div id="Laenge"></div></li>';
				//markup += '<li><div id="Schwierigkeit"></div></li>';
				
				//gpxTrack.bindPopup(markup, { maxWidth : 450 });
				
				
			 // dies war unser Versuch die Pupups mitz dem jeweiligen Dateninhalten erscheinen zu lassen ...hat nicht funktioniert
				var popup = document.getElementById("Titel").innerHTML = window.TOURENINFO[track].Titel;
					gpxTrack.bindPopup(popup, { maxWidth : 450 });
					
			
			
			// Ausschnitt setzen (funktioniert nicht??????????????????)
			   //map.fitBounds(gpxTrack.getBounds()); -------->Bounds are not valid
			
			//var Bounds = (gpxTrack.getBounds());
			//map.fitBounds(Bounds); --------> ging auch nicht 
			
			
			
			
			gpxTrack.on("ready", function() {
				
				// Höhenprofil erzeugen
				profil.clear();
				gpxTrack.eachLayer(function(layer) {
					profil.addData(layer.feature);
					
					//Je nachdem obs hoch, runter, oder waagrecht geht, soll Profil rot, grün oder gelb eingefärbt sein. 
			
					//console.log (layer.feature.geometry.coordinates)
					var pts = layer.feature.geometry.coordinates;
				
					for (var i = 1; i< pts.length; i+= 1){
						//console.log(pts[i]);	//aktueller Punkt
						//console.log(pts[i-1]);	//vorhergehender Punkt
				
						// Entfernung bestimmen
						var dist = map.distance (
							[ pts[i][1],pts[i][0] ],
							[ pts[i-1][1],pts[i-1][0] ]
						).toFixed(0);
						//console.log(dist);
				
						var delta = pts[i][2] - pts[i-1][2];
						//console.log(delta, "Höhenmeter auf", dist, "m Strecke");
					
						var rad= Math.atan(delta/dist);
						var deg = rad * (180 / Math.PI).toFixed(1); //toFixed: in Klammer stehen Nachkommastellen
						//console.log(deg);
						
						//colorbrewer: Farbpaletten für Kartographie
						
						//var rot = ['#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15'] //rot: http://colorbrewer2.org/#type=sequential&scheme=Reds&n=6
						//var gruen = ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c'] //grün: http://colorbrewer2.org/#type=sequential&scheme=Greens&n=6
						
						var farbe;
						switch(true) { // checks if condition is true, not for certain values of a variable
							case (deg >= 20) :  farbe = "#bd0026"; break;
							case (deg >= 15) :  farbe = "'#f03b20"; break;
							case (deg >= 10) :  farbe = "#fd8d3c"; break;
							case (deg >= 5)  :  farbe = "#feb24c"; break;
							case (deg >= 1)  :  farbe = "#fed976"; break;
							case (deg >= -1) :  farbe = "yellow"; break;
							case (deg >= -5) :  farbe = "#d9f0a3"; break;
							case (deg >=-10) :  farbe = "#addd8e"; break;
							case (deg >=-15) :  farbe = "#78c679"; break;
							case (deg >= -20):  farbe = "#31a354"; break;
							case (deg < -20) :  farbe = "#006837"; break;
						}
						//console.log(farbe);
						
					
						var pointA = new L.LatLng(pts[i][1],pts[i][0]);
						var pointB = new L.LatLng(pts[i-1][1],pts[i-1][0]);
						var pointList = [pointA, pointB];
		   
						var firstpolyline = new L.Polyline(pointList, {
							color: farbe,
							weight: 6,
							opacity: 0.5,
							smoothFactor: 1

						});
			
						firstpolyline.addTo(map);
					
					map.fitBounds(gpxTrack.getBounds());
					
					}
				});
			});
		
		}	
		//Icons von https://mapicons.mapsmarker.com/
		var einkehr = [
		L.marker([47.439611, 11.686361],{title: "Langlaufstüberl", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.426412, 11.728365],{title: "Seealm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.539914, 12.567615],{title: "Seerestaurant Blattl", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.584216, 12.570386],{title: "Alte Schmiede Weinstube- Pizzeria", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.130788, 11.405729],{title: "Maria Waldrastgasthof", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.162357, 11.366385],{title: "Kirchbrücke Restaurant", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.561463, 12.414330],{title: "Käserei", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.603940, 12.382375],{title: "Gasthaus Hohenkendl", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.463504, 12.220496],{title: "Filzalm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.497888, 12.197728],{title: "Hexenalm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.342083, 10.899485],{title: "Marienbergalm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.315646, 10.888394],{title: "Gasthof Aschlandhof", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.536741, 11.913402],{title: "Kaiserhaus", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.581662, 11.799271],{title: "Gufferthütte", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.259608, 10.876103],{title: "Gasthof Rafting Alm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.241905, 10.878112],{title: "Oilers 69", icon : L.icon({ iconUrl:'icons/hut.png'})})
		
		];
		var einkehrLayer = L.featureGroup();
		for (var i=0; i<einkehr.length; i++) {
		einkehrLayer.addLayer(einkehr[i]); 
		};
		// einkehrLayer.addTo(map);
		
		
		var start = [
		L.marker([47.392285, 11.267306], {title: "Startpunkt Karwendelrunde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.476926, 12.544588], {title: "Startpunkt Pillersee-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.263363, 11.400469], {title: "Startpunkt Maria Waldrast-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.668861, 12.404069], {title: "Startpunkt Kaiserwinkl-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.446109, 12.162167], {title: "Startpunkt Hohe Salve-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.319768, 10.830670], {title: "Startpunkt Marienbergjoch-Runde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.536660, 11.913398], {title: "Startpunkt Guffertrunde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.198614, 10.902923], {title: "Startpunkt Runde im vorderen Ötztal", icon: L.icon({iconUrl: 'icons/start-race-2.png'})})
		];
		var startLayer = L.featureGroup();
		for (var i=0; i<start.length; i++) {
		startLayer.addLayer(start[i]); 
		};
		
		
		var ziel = [
		L.marker([47.392200, 11.267300], {title: "Endpunkt Karwendelrunde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.476900, 12.544500], {title: "Endpunkt Pillersee-Runde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.263300, 11.400400], {title: "Endpunkt Maria Waldrast-Runde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.668800, 12.404000], {title: "Endpunkt Kaiserwinkl-Runde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.446100, 12.162100], {title: "Endpunkt Hohe Salve-Runde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.319700, 10.830600], {title: "Endpunkt Marienbergjoch-Runde", icon: L.icon({iconUrl: 'icons/finish.png'})}),
		L.marker([47.536600, 11.913300], {title: "Endpunkt Guffertrunde", icon: L.icon({iconUrl: 'icons/start-race-2.png'})}),
		L.marker([47.198600, 10.902900], {title: "Endpunkt Runde im vorderen Ötztal", icon: L.icon({iconUrl: 'icons/finish.png'})})
		];
		var zielLayer = L.featureGroup();
		for (var i=0; i<ziel.length; i++) {
		zielLayer.addLayer(ziel[i]); 
		};
		
		
		//Icons von https://mapicons.mapsmarker.com/
		var parken = [
		L.marker([47.392285, 11.267306],{title: "Parkplatz Karwendel", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.491241, 12.528752],{title: "Parkplatz Pillersee", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.263363, 11.400469],{title: "Parkplatz Maria Waldrast", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.663173, 12.396350],{title: "Parkplatz Kaiserwinkl", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.446109, 12.162167],{title: "Parkplatz Hohe Salve", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.315259, 10.843393],{title: "Parkplatz Marienbergjoch", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.536660, 11.913398],{title: "Parkplatz Guffertrunde", icon : L.icon({ iconUrl:'icons/parken.png'})}),
		L.marker([47.198614, 10.902923],{title: "Parkplatz Vorderes Ötztal", icon : L.icon({ iconUrl:'icons/parken.png'})})
		];
		var parkenLayer = L.featureGroup();
		for (var i=0; i<parken.length; i++) {
		parkenLayer.addLayer(parken[i]);
		};
		
		
		
		var lohnendeStops = [
		L.marker([47.439611, 11.686361],{title: "Airrofan Skyglider - Rofan Cable Car Company", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.430991, 11.734883],{title: "Strandbad Buchau ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.500756, 12.571718],{title: "Jakobskreuz Aussichtspalttform ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.587565, 12.565102],{title: "Steinplatte Waidring Aussichtsplattform ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.130788, 11.405729],{title: "Maria Waldrast Klosteranlage ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.136798, 11.453339],{title: "Pfarrkirche Mariä Himmelfahrt ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.561463, 12.414330],{title: "Schaukäserei ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.557505, 12.447250],{title: "Museum Metzgerhaus ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.462960, 12.224004],{title: "Baden Filzalmsee ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.480283, 12.197561],{title: "Hexenwasser ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.362701, 10.872196],{title: "Weißensee ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.345703, 10.817517],{title: "Fernstein ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.540150, 11.916547],{title: "Kaiserklamm ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.200440, 10.905384],{title: "Erlebnisbad Ötz ", icon : L.icon({ iconUrl:'icons/sight-2.png'})}),
		L.marker([47.228989, 10.844389],{title: "Area 47 ", icon : L.icon({ iconUrl:'icons/sight-2.png'})})
		
				
		];
		var lohnendeStopsLayer = L.featureGroup();
		for (var i=0; i<lohnendeStops.length; i++) {
		lohnendeStopsLayer.addLayer(lohnendeStops[i]);
		};
		
		
		
		
		//nur wenn reingezoomt wird, sollen icons angezeigt werden
		map.on("zoomend", function () {
			if (map.getZoom() >=15) {
				einkehrLayer.addTo(map);
				parkenLayer.addTo(map);
				lohnendeStopsLayer.addTo(map);
				startLayer.addTo(map);
				zielLayer.addTo(map);
			} else {
				map.removeLayer(einkehrLayer);
				map.removeLayer(parkenLayer);
				map.removeLayer(lohnendeStopsLayer);
				map.removeLayer(startLayer);
				map.removeLayer(zielLayer);
			}
		});
		
		
		
		
		
		
		
		//var start = [
		//L.marker([47.521785, 11.787147],{icon : L.icon({ iconUrl:'icons/start-race-2.png'})})
		//];
		//start.addTo(map);
		
		//var start = L.featureGroup();
		//for (var i=0; i<start.length; i++) {
		//start.addLayer(start[i]);
		//};
		
		
		//Adlerblicke: Tourismusverband Achensee	Am Rofan, neben dem Almstüberl, gegenüber der Rofanseilbahn Bergstation	1831	47°26'29.54"N 	11°45'49.10"E

		

			var tourenSelektor = document.getElementById("gpx"); 
			tourenSelektor.onchange = function(evt) {
				console.log("change event: ", evt);
				console.log("GPX Track laden: ", tourenSelektor.selectedIndex);
				loadTrack(tourenSelektor.options[tourenSelektor.options.selectedIndex].value);
			}
			loadTrack("Guffertrunde.gpx")
			
			//Icons von https://mapicons.mapsmarker.com/
		var einkehr = [
		L.marker([47.439611, 11.686361],{title: "Langlaufstüberl", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.426412, 11.728365],{title: "Seealm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.539914, 12.567615],{title: "Seerestaurant Blattl ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.584216, 12.570386],{title: "Alte Schmiede Weinstube - Pizzeria", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.130788, 11.405729],{title: "Maria Waldrastgasthof ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.162357, 11.366385],{title: "Kirchbrücke ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.561463, 12.414330],{title: "Käserei ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.603940, 12.382375],{title: "Gasthaus Hohenkendl ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.463504, 12.220496],{title: "Filzalm ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.497888, 12.197728],{title: "Hexenalm", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.342083, 10.899485],{title: "Marienbergalm ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.315646, 10.888394],{title: "Gasthof Aschlandhof ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.536741, 11.913402],{title: "Kaiserhaus ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.581662, 11.799271],{title: "Gufferthütte ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.259608, 10.876103],{title: "Gasthof Rafting Alm ", icon : L.icon({ iconUrl:'icons/hut.png'})}),
		L.marker([47.241905, 10.878112],{title: "Oilers 69 ", icon : L.icon({ iconUrl:'icons/hut.png'})})
		];
		
		var einkehrLayer = L.featureGroup();
		for (var i=0; i<einkehr.length; i++) {
		einkehrLayer.addLayer(einkehr[i]);
		};
		einkehrLayer.addTo(map);
		
		
		var start = 
		L.marker([47.521785, 11.787160], {title: "Startpunkt", icon: L.icon({iconUrl: 'icons/start-race-2.png'})})
		;
		
		var ende = 
		L.marker([47.441767, 11.762950], {title: "Endpunkt", icon: L.icon({iconUrl: 'icons/finish.png'})})
		;
		
		var adlerblick = 
		L.marker([47.441539, 11.763639], {title: "Aussichtspunkt", icon: L.icon({iconUrl: 'icons/panoramicview.png'})})
		;
		
		
		//.addTo(map);
		
		//nur wenn reingezoomt wird, sollen icons angezeigt werden
		map.on("zoomend", function () {
			if (map.getZoom() >=15) {
				einkehrLayer.addTo(map);
				start.addTo(map);
				ende.addTo(map);
				adlerblick.addTo(map);
			} else {
				map.removeLayer(einkehrLayer);
				map.removeLayer(start);
				map.removeLayer(ende);
				map.removeLayer(adlerblick);
			}
		});
		
			
		
}