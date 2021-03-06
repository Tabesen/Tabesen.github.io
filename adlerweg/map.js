
        // WMTS-Layer basemap.at - Quelle: http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        window.onload=function(){
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
            center: [47.654, 13.370],
            zoom: 8
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

        //L.geoJSON(window.etappe02).addTo(map); //oder mit omnivore erfüllt gleiche funktion
        //omnivore.gpx('data/adlerwegeetappe02').addTo(map);
		//Funmtion zum laden eines tracks
		
        function loadTrack(track) {
			console.log("etappeninfo:",window.ETAPPENINFO);
			console.log("info:",window.ETAPPENINFO[track]);
			console.log("Kurztext:",window.ETAPPENINFO[track].
			Kurztext);
			document.getElementById("Titel").innerHTML=window.ETAPPENINFO[track].Titel;
			document.getElementById("Kurztext").innerHTML=window.ETAPPENINFO[track].Kurztext;
			document.getElementById("Streckenbeschreibung").innerHTML=window.ETAPPENINFO[track].Streckenbeschreibung;
			
            //laden des gpxTracks 
            gpxTrack = omnivore.gpx('data/' + track).addTo(map);

            var markup = '<h3> Adlerweg-Etappe 2: Gaudeamushütte- Hintersteiner See</h3>';
            gpxTrack.bindPopup(markup, {
                maxWidth: 450
            });

            //"elevation" öffnet hier das Diagrammfenster benötigt aber  L.geoJSON (window.etappe02...each festure...) um Diagrammfläche zu füllen
            var profile = L.control.elevation({
                position: 'bottomright'
            });
            profile.addTo(map);

            L.geoJSON(window.etappe02, {
                onEachFeature: profile.addData.bind(profile)
            }).addTo(map);

            var restaurant = [
                L.marker([47.549167, 12.324722], {
                    title: "Gaudeamushütte",
                    icon: L.icon({
                        iconUrl: 'icons/restaurant.png'
                    })
                }),
                L.marker([47.553584, 12.311146], {
                    title: "Gruttenhütte",
                    icon: L.icon({
                        iconUrl: 'icons/restaurant.png'
                    })
                }),
                L.marker([47.543298, 12.222692], {
                    title: "Seestüberl",
                    icon: L.icon({
                        iconUrl: 'icons/restaurant.png'
                    })
                }),
                L.marker([47.540944, 12.196768], {
                    title: "Pension Maier",
                    icon: L.icon({
                        iconUrl: 'icons/restaurant.png'
                    })
                })
            ];

            var restaurantLayer = L.featureGroup();
            for (var i = 0; i < restaurant.length; i++) {
                restaurantLayer.addLayer(restaurant[i]);
            }
            restaurantLayer.addTo(map);

            //wenn Restaurantsymbole erst bei einer bestimmten Zoomstufe auftauchen sollen in der karte
            map.on("zoomend", function() {
                if (map.getZoom() >= 15) {
                    map.addLayer(restaurantLayer);
                } else {
                    map.removeLayer(restaurantLayer);
                }
            });

            var start = [
                L.marker([47.54923, 12.32454], {
                    title: "Start",
                    icon: L.icon({
                        iconUrl: 'icons/start.png'
                    })
                })
            ];

            var startLayer = L.featureGroup();
            for (var i = 0; i < start.length; i++) {
                startLayer.addLayer(start[i]);
            }
            startLayer.addTo(map);

            //wenn Startsymbole erst bei einer bestimmten Zoomstufe auftauchen sollen in der karte
            map.on("zoomend", function() {
                if (map.getZoom() >= 15) {
                    map.addLayer(startLayer);
                } else {
                    map.removeLayer(startLayer);
                }
            });

            var ende = [
                L.marker([47.54077, 12.19680], {
                    title: "Ende",
                    icon: L.icon({
                        iconUrl: 'icons/ende.png'
                    })
                })
            ];

            var endeLayer = L.featureGroup();
            for (var i = 0; i < ende.length; i++) {
                endeLayer.addLayer(ende[i]);
            }
            endeLayer.addTo(map);

            //wenn Restaurantsymbole erst bei einer bestimmten Zoomstufe auftauchen sollen in der karte
            map.on("zoomend", function() {
                if (map.getZoom() >= 15) {
                    map.addLayer(endeLayer);
                } else {
                    map.removeLayer(endeLayer);
                }
            });

            var aussicht = [
                L.marker([47.553564, 12.311135], {
                    title: "Adlerblick",
                    icon: L.icon({
                        iconUrl: 'icons/aussicht.png'
                    })
                })

            ];

            var aussichtLayer = L.featureGroup();
            for (var i = 0; i < aussicht.length; i++) {
                aussichtLayer.addLayer(aussicht[i]);
            }
            aussichtLayer.addTo(map);

            //wenn Aussichtsymbole erst bei einer bestimmten Zoomstufe auftauchen sollen in der karte
            map.on("zoomend", function() {
                if (map.getZoom() >= 15) {
                    map.addLayer(aussichtLayer);
                } else {
                    map.removeLayer(aussichtLayer);
                }
            });



            //var startEndeLayer= L.featureGroup();
            //for (var i=0; i<startEnde.length; i++){
            //startEndeLayer.addLayer(startEnde[i]);
            //}
            //startEndeLayer.addTo(map);
            //wenn Hüttensymbole erst bei einer bestimmten Zoomstufe auftauchen sollen in der karte
            //map.on("zoomend",function()  {
            //if (map.getZoom()>=15) {
            //map.addLayer(startEndeLayer);
            //} else {
            //map.removeLayer(startEndeLayer);
            //}
            //});
            //var startEnde= [
            //L.marker([47.54985, 12.32467], {title: "Start", icon : L.icon({iconUrl: 'icons/start-race-2.png'}) }),
            //L.marker([47.540944, 12.196715], {title: "Ende", icon : L.icon({iconUrl: 'icons/finish.png'}) })
            //];	


            // Popup hinzufügen
            var markup = '<h3>Adlerweg-Etappe 2: Gaudeamushütte – Hintersteiner See</h3>';
            markup += '<p>Die zweite Etappe führt ausgehend von der Gaudeamushütte über den Klammlweg zu einem besonderem Ziel entlang des Adlerwegs: dem Hintersteiner See. Der Bergsee lockt vor allem im Hochsommer mit Badefreuden.</p>'
            markup += '<li>Ausgangspunkt: Gaudeamushütte</li>';
            markup += '<li>Endpunkt: Hintersteiner See</</li>';
            markup += '<li>Höhenmeter bergauf: 800</li>';
            markup += '<li>Höhenmeter bergab: 1130</li>';
            markup += '<li>Höchster Punkt: 1630</li>';
            markup += '<li>Schwierigkeitsgrad: mittelschwierig</li>';
            markup += '<li>Streckenlänge (in km): 14,5</li>';
            markup += '<li>Gehzeit (in Stunden): 6</li>';
            markup += '<li>Einkehrmöglichkeiten: Gaudeamushütte,Gruttenhütte,Seestüberl,Pension Maier</li>';
            markup += '<li><a http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-2-gaudeamushuette-hintersteiner-see">Weitere Informationen</a></li>';
            gpxTrack.bindPopup(markup, {
                maxWidth: 450
            });

            // Ausschnitt setzen
            // funktioniert nicht: map.fitBounds(gpxTrack.getBounds());
            map.fitBounds([
                [47.54069, 12.19956],
                [47.54934, 12.32497]
            ]);
            //gpxTrack.on("ready", function() { damit sage ich das omnivor warten soll auf gpx tracks...wichtig!
            gpxTrack.on("ready", function() {

                // Höhenprofil erzeugen
				profile.clear();
                gpxTrack.eachLayer(function(layer) {
                    profile.addData(layer.feature);

                    console.log("gpxTrack", gpxTrack);
                    //GPX punkte anzeigen var pts= 

                    console.log(layer.feature.geometry.coordinates)
                    var pts = layer.feature.geometry.coordinates;

                    for (var i = 1; i < pts.length; i += 1) {
                        console.log(pts[i]); //aktuelle Punkt
                        console.log(pts[i - 1]); //vorhergehender Punkt (i+1 wäre der nächste Punkt zum Beispiel)

                        //entfernung  bestimmen
                        var dist = map.distance(
                            [pts[i][1], pts[i][0]], [pts[i - 1][1], pts[i - 1][0]]
                        ).toFixed(0);
                        //console.log(dist);

                        var delta = pts[i][2] - pts[i - 1][2];
                        console.log(delta, "Höhenmeter auf", dist, "m Strecke");

                        //Formle für die Berechnung der Steigung in Grad-> toFixed macht die Kommastelle um 1 (d.h. 4,5)

                        var rad = Math.atan(delta / dist);
                        var deg = (rad * (180 / Math.PI)).toFixed(1);
                        console.log(deg);
                        //colorbrewer
                        var farbe;
                        //rosa http://colorbrewer2.org/#type=sequential&scheme=PuRd&n=6
                        //['#f1eef6','#d4b9da','#c994c7','#df65b0','#dd1c77','#980043']


                        //grün http://colorbrewer2.org/#type=sequential&scheme=GnBu&n=6
                        //['#f0f9e8','#ccebc5','#a8ddb5','#7bccc4','#43a2ca','#0868ac']
                        switch (true) { // checks if condition is true, not for certain values of a variable
                            case (deg >= 20):
                                farbe = "#bd0026";
                                break;
                            case (deg >= 15):
                                farbe = "#f03b20";
                                break;
                            case (deg >= 10):
                                farbe = "#fd8d3c";
                                break;
                            case (deg >= 5):
                                farbe = "#feb24c";
                                break;
                            case (deg >= 1):
                                farbe = "#fed976";
                                break;
                            case (deg >= -1):
                                farbe = "yellow";
                                break;
                            case (deg >= -5):
                                farbe = "#d9f0a3";
                                break;
                            case (deg >= -10):
                                farbe = "#addd8e";
                                break;
                            case (deg >= -15):
                                farbe = "#78c679";
                                break;
                            case (deg >= -20):
                                farbe = "#31a354";
                                break;
                            case (deg < -20):
                                farbe = "#006837";
                                break;
                        }
                        console.log(deg, farbe);



                        //Linien zeichnen
                        var pointA = new L.LatLng(pts[i][1], pts[i][0]);
                        var pointB = new L.LatLng(pts[i - 1][1], pts[i - 1][0]);
                        var pointList = [pointA, pointB];

                        var firstpolyline = new L.Polyline(pointList, {
                            color: farbe,
                            weight: 6,
                            opacity: 0.5,
                            smoothFactor: 1

                        });

                        firstpolyline.addTo(map);



                        //console.log(dist); });

                    }


                });


            });
        }
        //Höhenprofil in karte rechts oben und mann muss omivor von oben wieder auskommentieren 
        //var el = L.control.elevation();
        //el.addTo(map);


        //name in der konsole sollte nun vom gpx track angezeigt werden
        var etappenSelektor = document.getElementById("etappe");
        etappenSelektor.onchange = function(evt) {
            console.log("Change event: ", evt);
            console.log("GPX Track laden: ", etappenSelektor[etappenSelektor.selectedIndex].value);
            loadTrack(etappenSelektor[etappenSelektor.selectedIndex].value);
        }
		loadTrack("AdlerwegEtappe01.gpx")
		
		};