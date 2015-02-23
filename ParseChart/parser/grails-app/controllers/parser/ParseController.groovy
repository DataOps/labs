package parser

import grails.converters.JSON
import groovy.json.JsonBuilder
import liquibase.util.csv.CSVReader

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
		Boolean jump = false
		String[] arr

		while(scnr.hasNextLine()){
			currentLine = scnr.nextLine().toLowerCase()


			//todo: dont iterate through all lines to check the chartType
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
			} else if(currentLine.contains("csv")){
				chartType = "csv"
				print "must jump"
				jump = true
			}
			print jump
			print chartType


			if(currentLine.substring(0,5).equals("value") && !jump){
				name = currentLine.substring(6, currentLine.lastIndexOf('='))
				values = currentLine.substring(currentLine.lastIndexOf('=')+2)
				arrTypes.add(currentLine.substring(6, currentLine.lastIndexOf('=')));
				fullData += "{ \"" + "param" + "\": " + "\"" + name + "\", " + "\"val\":"+  "["  + values + "] } ,"
			}

			if(jump){
				arr = currentLine.split(",");
				if(!currentLine.contains("csv")){

					fullData += arr.toString() + ","

				}
			}

		}

		if(!chartType.equals("csv")){
			fullData = fullData.substring(0,fullData.length()-1)
		}

		print fullData
		def fullData2 = "{\"results\": [ " + fullData + " ]," + " \"chartType\": \"" + chartType + "\" }"
		if(chartType.equals("csv")){
			render(fullData as String)
			
		} else {
		render(fullData2 as String)
		}

	}
}
