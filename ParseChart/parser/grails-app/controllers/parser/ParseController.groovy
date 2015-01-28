package parser

import grails.converters.JSON
import groovy.json.JsonBuilder

class ParseController {

	def index() {
		response.setHeader("Access-Control-Allow-Origin", "*")

		def arrTypes = []
		def parseData = params.input
		Scanner scnr = new Scanner(parseData)
		String currentLine
		String chartType
		String values = ""
		String name = ""
		String fullData = ""

		while(scnr.hasNextLine()){
			currentLine = scnr.nextLine().toLowerCase()

			if(currentLine.contains("barchart") || currentLine.contains("bar") ){
				chartType = "bar"
			} else if(currentLine.contains("piechart") || currentLine.contains("pie")){
				chartType = "pie"
			} else if(currentLine.contains("linechart") || currentLine.contains("line")){
				chartType = "line"
			} else if(currentLine.contains("area") || currentLine.contains("areachart")){
				chartType = "area"
			} else if(currentLine.contains("area-spline") || currentLine.contains("areaspline")){
				chartType = "area-spline"
			} else if(currentLine.contains("donut")){
				chartType = "donut"
			} else if(currentLine.contains("scatter")){
				chartType = "scatter"
			}

			if(currentLine.substring(0,5).equals("value")){
				name = currentLine.substring(6, currentLine.lastIndexOf('='))
				values = currentLine.substring(currentLine.lastIndexOf('=')+2)
				arrTypes.add(currentLine.substring(6, currentLine.lastIndexOf('=')));
				fullData += "{ \"" + "param" + "\": " + "\"" + name + "\", " + "\"val\":"+  "["  + values + "] } ,"
			}
		}

		fullData = fullData.substring(0,fullData.length()-1)
		def fullData2 = "{\"results\": [ " + fullData + " ]," + " \"chartType\": \"" + chartType + "\" }" 
		render(fullData2 as String)
		
	}
}
