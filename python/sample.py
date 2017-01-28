class Square:
	
	def __init__(self,height="0",width="0"):
		self.height = height
		self.width = width

	@property
	def height(self):
		print("Retrieving the Height")
		return self.__height

	@height.setter
	def height(self,value):
		if value.isdigit():
			self.__height=value
		else:
			print("Please enter numbers")

	@property
	def width(self):
		print("Retrieving the Width")
		return self.__width

	@width.setter
	def width(self,value):
		if value.isdigit():
			self.__width=value
		else:
			print("Please enter numbers")

	def getArea(self):
		return int(self.__width)*int(self.__height)

def main():
	aSquare = Square()

	height = input("Enter Height : ")
	width = input("Enter Width : ")

	aSquare.height = height
	aSquare.width = width

	print("Height :",aSquare.height)
	print("Width :",aSquare.width)

	print("The Area is :",aSquare.getArea())

main()