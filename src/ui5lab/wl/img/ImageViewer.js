/* global Viewer:true */
sap.ui.define(["sap/ui/core/Control", 'sap/ui/core/Popup', './lib/viewer.min'], function(Control, Popup) {
	"use strict";
	return Control.extend("ui5lab.wl.img.ImageViewer", {
		"metadata": {
			"properties": {
				"src": "string"
			},
			"events": {}
		},
		keyEnter: 13,
		init: function() {
			this.log = jQuery.sap.log;
			this.attachBrowserEvent("keydown", this.catchOnEnter);

		},
		renderer: function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.write(">");
			oRm.write("<img");
			oRm.writeAttributeEscaped("src", oControl.getSrc());
			oRm.write(">");
			oRm.write("</img>");
			oRm.write("</div>");
		},
		onBeforeRendering: function(evt) {
			var cssId = 'myCss'; // you could encode the css path itself to generate id..
			if (!document.getElementById(cssId)) {
				var head = document.getElementsByTagName('head')[0];
				var link = document.createElement('link');
				link.id = cssId;
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = jQuery.sap.getModulePath("ui5lab.wl.img.lib") + "/viewer.min.css";
				link.media = 'all';
				head.appendChild(link);
			}
		},
		onAfterRendering: function(evt) {
			if (this.getSrc() && this.getSrc().length > 0) {
				this.viewer = new Viewer(this.getDomRef(), {
					title: false,
					tooltip: false,
					movable: false,
					scalable: false,
					navbar: false,
					fullscreen: false,
					transition: false
				});
			}
		},
		catchOnEnter: function(oEvent) {
			this.log.info("keydown:" + event.keyCode);

			switch (event.keyCode) {
				case this.keyEnter:
					this.viewer.hide();
					break;
				default:
			}
		},
		open: function() {
			sap.ui.getCore().getRenderManager().render(this, sap.ui.getCore().getStaticAreaRef());
			if (this.viewer) {
				this.viewer.show();
			}
		},
		setSrc: function(value) {
			this.setProperty("src", value, true);
			return this;
		}
	});
});