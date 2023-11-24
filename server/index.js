const express = require('express');
const jwt = require('jsonwebtoken');
const basicAuth = require('basic-auth');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();
const port = 3002;



const propertyList = [{
  id: 1,
  user: 'demo',
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  location: 'Darpan',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'Flat',
  price: 3900,
  reviewCount: 34,
  rating: 4,
},
{
  id: 2,
  user: 'admin',
  imageUrl: 'https://i.ibb.co/kGgZ1Zv/452311982-O-1697875180375.jpg',
  imageAlt: 'Rear view of modern home with pool',
  location: 'Bhago Majra',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'PG',
  price: 14900,
  reviewCount: 34,
  rating: 4,
},
{
  id: 3,
  user: 'admin',
  imageUrl: 'https://i.ibb.co/JcHndgb/448262314-O-1696041109099.jpg" alt="448262314-O-1696041109099',
  imageAlt: 'Rear view of modern home with pool',
  location: 'Shivjot',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'Flat',
  price: 5000,
  reviewCount: 34,
  rating: 4,
},

{
  id: 4,
  user: 'admin',
  imageUrl: 'https://i.ibb.co/QDNy45p/449999468-O-1696846975857.jpg" alt="449999468-O-1696846975857',
  imageAlt: 'Rear view of modern home with pool',
  location: 'Omega City',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'Flat',
  price: 3500,
  reviewCount: 34,
  rating: 4,
},
{
  id: 5,
  user: 'admin',
  imageUrl: 'https://i.ibb.co/ydVTz7k/452305856-O-1697876155598.jpg" alt="452305856-O-1697876155598',
  imageAlt: 'Rear view of modern home with pool',
  location: 'Modern Valley',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'PG',
  price: 3600,
  reviewCount: 34,
  rating: 4,
},
{
  id: 6,
  user: 'admin',
  imageUrl: 'https://i.ibb.co/sy8HN50/453330572-O-1698405964290.jpg" alt="453330572-O-1698405964290',
  imageAlt: 'Rear view of modern home with pool',
  location: 'GBP Crest',
  title: 'Modern home in city center in the heart of historic Los Angeles',
  type: 'PG',
  price: 4000,
  reviewCount: 34,
  rating: 4,
}]


app.use(bodyParser.json({limit: '10mb'}));
const secretKey = 'mysecretkey'
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

// Allow requests from a specific origin (your React app's origin)
const corsOptions = {
  origin: ['http://localhost:3000','https://flat-apartment-rent.vercel.app']
};  

// Define a username and password for authentication
const username = 'aakash';
const password = '12345';

// Enable CORS with the specified options
app.use(cors(corsOptions));
const users = [];
//👇🏻 holds all the posts created
const threadList = [];
const reviewList = [];

users.push({name: 'aakash', email: 'admin', username: 'admin',mobileNo:'123',password:'admin'})

app.post('/signup', (req, res) => {
  const { name, email, username, mobileNo, password } = req.body;
  const newUser = { name, email, username, mobileNo, password };
  const oldUser = users.filter(user => user.username === newUser.username)
  console.log(oldUser)
  if (oldUser[0]) {
    res.status(401).json({
      message: 'User Already Exist!',
      status: 'fail',
    });
  }
  else{
    users.push(newUser);
    console.log(users)
    res.status(201).json({ message: 'Account created successfully' });
  }

});  



// Middleware to handle authentication and issue JWT tokens
const authenticate = (req, res) => {
  console.log(req.headers);
  const user = basicAuth(req);
  console.log('Reached here', user);
  // console.log(user.name);
  // console.log(user.pass);

  // console.log(users)
  
  if (!user) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Unauthorized');
  }
  const foundUser = users.find((u) => u.username === user.name && u.password === user.pass);
  console.log('userFound', foundUser)
  if(!foundUser){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send('Unauthorized');
  }
  // return res.status(200).send('WE are hitting authenticate')

  // // If authentication is successful, issue a JWT token
  const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1d' });
  res.json({ token });

  
};

const authMiddleware = (req, res, next) => {
  // const authHeader = req.body.headers.Authorization;
  const authHeader = req.body;
  console.log(req.body.token);
  if (!authHeader) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
  }
  // const token = authHeader.split(' ')[1];
  const token = req.body.token;
  console.log(token); 
  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
        status: 'fail Not recognized token!',
        message: 'Unauthorized!',
      });
  }
};

// Example protected route
app.get('/secure', authMiddleware, (req, res) => {
  res.send('This is a secure route!');
});

//Basic Login
app.post('/login', authenticate);

//Normal route for server confirmation
app.get('/', (req, res) => {
  res.send('Server Activated');
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.post('/create/thread', async (req, res) => {
  const { thread, token } = req.body;
  const threadId = generateID();
  const decoded = jwt.verify(token, secretKey);
  const username= decoded.username
  console.log({ thread,username , threadId });
  //👇🏻 add post details to the array
  threadList.unshift({
    id: threadId,
    title: thread,
    username,
    replies: [],
    likes: [],
});

//👇🏻 Returns a response containing the posts
res.json({
    message: "Thread created successfully!",
    threads: threadList,
});
});




app.get("/all/threads", (req, res) => {
	res.json({
		threads: threadList,
	});
});

app.post("/thread/like", (req, res) => {
	const { threadId, userName } = req.body;
	const result = threadList.filter((thread) => thread.id === threadId);
	const threadLikes = result[0].likes;

	const authenticateReaction = threadLikes.filter((user) => user === userName);

	if (authenticateReaction.length === 0) {
		threadLikes.push(userName);
		return res.json({
			message: "You've reacted to the post!",
		});
	}
	res.json({
		error_message: "You can only react once!",
	});
});


app.post("/thread/replies", (req, res) => {
	const { id } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	res.json({
		replies: result[0].replies,
		title: result[0].title,
	});
});

app.post("/create/reply", async (req, res) => {
	const { id ,userName ,reply } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	const username = users.filter((user) => user.username === userName);
	result[0].replies.unshift({ name: username[0].username, text: reply });

	res.json({
		message: "Response added successfully!",
	});
});

app.post('/property', (req,res) => {
  const {propertyData, username} = req.body;
  // console.log('successfully uploaded', propertyData)
  const newProperty = {
    ...propertyData,
    id: propertyList.length + 1,
    user: username,
    reviewCount: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
    rating: Math.floor(Math.random() * (5-1 +1) )+1,
    price: Number(propertyData.price),
    contact: Number(propertyData.contact),
  }
  // console.log(newProperty);
  propertyList.push(newProperty);
  res.json({
    message: 'property successfully added'
  })
})

app.get("/property/getAll", (req,res) => {
  res.json({propertyList: propertyList})
})

app.post('/property/getById', (req,res) => {
  const {username} = req.body;
  const result = propertyList.filter((property) => property.user === username);
  console.log("successfully accessed!")
  res.json({propertyList: result})
})
app.post('/property/deleteById', (req,res) => {
  const {id} = req.body;
  // Find the index of the object with the matching id
const indexToDelete = propertyList.findIndex(item => item.id === id);

// Check if the index is valid (not -1)
if (indexToDelete !== -1) {
  // Use splice to remove the element at the found index
  propertyList.splice(indexToDelete, 1);
  console.log('Element deleted:', propertyList);
  res.json({propertyList: propertyList})
  // res.json('Successfully Deleted')
} else {
  console.log('Element with id', idToDelete, 'not found.');
  res.status(404).json('Element not found');
}
})

app.post('/reviews/submit', (req,res) => {
  const {id, username, message} = req.body;
  reviewList.unshift({id, username, message})
  res.json({
    message: 'successfully added'
  })
})

app.post('/reviews/getById', (req, res) => {
  const {id} = req.body;
  const review=reviewList.filter(review => review.id === id)
  if (review) {
    // If the review is found, send a success response
    res.status(200).json({
      success: true,
      review: review
    });
  } else {
    // If the review is not found, send a not found response
    res.status(404).json({
      success: false,
      message: 'Review not found'
    });
  }
})



