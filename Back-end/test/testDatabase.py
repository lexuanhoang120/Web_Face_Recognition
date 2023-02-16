import mysql.connector

connection = mysql.connector.connect(host='192.168.1.55',
                                     database='xuanhoang',
                                     user='admin',
                                     password='123456')



cursor = connection.cursor()
query = """ select * from items;"""
cursor.execute(query)
values = cursor.fetchall()
print(values)
