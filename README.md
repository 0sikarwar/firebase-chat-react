
# firebase-chat-react

P2P react chat component made with firebase realtime databse and cloud databse. 
It has function to login, register and signout user. Just need to pass firebase config to use it.
Then login user to show the chat component.




## Usage
1. Firstly intitalize firbase app. By adding config of you firbase web project. https://firebase.google.com/docs/web/learn-more#config-object
###### Chat will not work without initializing firebase
```js
initializeFirebaseApp({
      apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_FIREBASE_APPID,
    });
```
2. Login, register or signout user using  function provided.
###### when user is logged in then only chat will work
> Enable Email/Password sign-in:
In the [Firebase console](https://console.firebase.google.com/ "Firebase console"), open the Auth section.
On the Sign in method tab, enable the Email/password sign-in method and click Save.On the Sign in method tab, enable the Email/password sign-in method and click Save.
```js
await loginUser(email, password)
// you can add more fields if you want
await registerUser({
      email: user.email,
      password: user.email,
      name: user.username,
      address: user.address,
	  avatar: user.ImageUrl
    });
	await signoutUser()
```
3. Render the react component.
```js
<FiresbaseChatReact/>
```
4. Full example:
```javascript
import FiresbaseChatReact, { initializeFirebaseApp, loginUser, registerUser, signoutUser } from "firebase-chat-react";
const example = () =>{
	const [isLoggedin, setIsLoggedIn] = useState(false)
	const init = async () =>{
	initializeFirebaseApp({
		  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
		  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
		  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
		  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
		  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
		  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
		  appId: process.env.REACT_APP_FIREBASE_APPID,
		});
		const userObj = await loginUser(email, password)
		if(userObj) setIsLoggedIn(true)
}
useEffect(()=>{
init()
},[])
return isLoggedin && <FiresbaseChatReact/>
}
```
## Props
All props are optional.
- **defaultAvatar**: user Avatar which will be used when user profile pic is not there.
- **websiteLogo**: Used in header of chat window.
- **closeIcon**: Close icon on header of chat window.
- **chatToggleIcon**: Logo used to open chat window.

## Styling
For styling classes given to each element can be used.
For Example: 
`chats-container,chat-window,message-history, chat-window-show, chat-toggle, chat-toggle-container, profile-img, message-username, online, offline, glow-green, glow-red, chat-head, chat-history-window,message-search, send-icon, message-content, message-read, message-received, message-sent` etc.
