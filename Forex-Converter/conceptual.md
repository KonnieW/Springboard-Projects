### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
Python is back end and Javascript is front end. 

Python is a high-level general-purpose interpreted programming language that was developed to emphasize code readability. JavaScript is a programming language that conforms to the ECMAScript specification. 

Python allows for comparison of dictionaries and lists whereas Javascript doesn't. For example, [1,2,3] !== [1,2,3] in JS however in python [1,2,3] == [1,2,3]. Python has an out of the box data structure called a tuple which is not natively out of the box for JS. Python and Javascript also have very different syntax. Another difference is that Python has out of the box testing with doctests unlike JS which requires writing tests in another file. Python throws more errors than JS whereas JS will return undefined instead of throwing an error. This can make it difficult to debug JS but also allows someone to take advantage of the idea that JS doesn't throw errors.

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

You can use the get method: `dict.get('c')`. This will return None if the key doesn't exist. You can also use try except as well:
  
  ```py
  try:
    dict['c']
  except:
    print('This is not a key in the dictionary')
  ```
  One last thing you could do is use an if statement to check if the key exists before accessing:
  
```py
if c in dict:
  dict['c']
```

- What is a unit test?

A unit test is testing one small, isolated piece of functionality, a unit. This could be testing a function on it's own without testing how the functions interacts with the rest of the program.

- What is an integration test?

An integration test is testing how pieces of functionality interact with each other and that they work correctly. This could be testing a view function to make sure all the routing and returning works correctly.

- What is the role of web application framework, like Flask?

Flask gives the developer varieties of choice when developing web applications, it provides you with tools, libraries, and mechanics that allow you to build a web application but it will not enforce any dependencies or tell you how the project should look like.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

There isn't an exact better way to do this but it depends on the situation. You can generally use query string parameters if you are describing the object you are on vs using the route for the object itself. For example, in the above case I would use /foods/pretzel and then use a query string parameter if I am decribing the pretzel such as /foods/pretzel?type=salty or /foods/pretzel?type=sugar.

- How do you collect data from a URL placeholder parameter using Flask?

You can specify the variable in the app.route and then use that variable as a paramater in the routing function. Here is an example of the pretzel:

```py
  @app.route('/foods/<food>')
  def grocery(food):
      x = food
```

- How do you collect data from the query string using Flask?

With a query string the data can be found in the request.args dictionary:

```py
  @app.route('/foods')
  def grocery():
      x = request.args.get('type')
```

- How do you collect data from the body of the request using Flask?

You can get the data form a post request in the body using the request.form dictionary

```py
  @app.route('/foods')
  def grocery():
      x = request.form.get('type')
```

- What is a cookie and what kinds of things are they commonly used for?

A cookie is piece of information which stores the domain, "key", and "value" that gets sent from the server to the client. It allows the client to send back that information to the server so the server can use that information. It allows for a user to go back in to a session to resume where they left off.

- What is the session object in Flask?

The session object is built off of using cookies. It allows the server to set many different things in the session for the client to remember wihout having to create many different cookies and just have one session. It is also encoded so that someone can't change session data on the client before sending it to the server.

- What does Flask's `jsonify()` do?

jsonify will take JSON serializeable data in python and convert it to a JSON string.

<!-- ctrl +shift+ v opens the conceptual preview -->