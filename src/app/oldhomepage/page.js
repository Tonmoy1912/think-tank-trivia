"use client";
import style from "./style.module.css";
import dark from "./dark.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';
import Link from "next/link";
import ChatIcon from "@/components/ChatIcon";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/userContext/userContext";
import { FaLightbulb } from "react-icons/fa";
import Modal from "@/components/Modal";
import { toast } from 'react-toastify';
import '../global.css'
import { FaSmile } from "react-icons/fa";
export default function App() {
  const [mode,setMode]=useState(true)
  const router = useRouter();
  const [github,setGithub]=useState(false);
  const [contributors,setContributors]=useState([]);
  useEffect(()=>{
    const fetchContributors=()=>{
      fetch('https://api.github.com/repositories/699492494/contributors',{
        method:'GET',
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        setContributors(data);
        if(data.length==4){
          setGithub(true);
        }
      })
    }
    fetchContributors();
  },[])
  useEffect(()=>{
    const modes=()=>{
      const g=localStorage.getItem('website_mode');
      if(g===null){
        setMode(true);
        localStorage.setItem('website_mode',true);
      }
      else{
        let f=true;
        if(g==='false'){
          f=false;
        }
        else{
          f=true
        }
        setMode(f)
      }
    }
    modes()
  },[])
  // const { data, status } = useSession();
  const { auth_session: data, auth_status: status } = useContext(UserContext);
  const { user } = useContext(UserContext);
  // console.log(user)
  const modeHandler=()=>{
      if(mode===true){
        setMode(false);
        localStorage.setItem('website_mode',false);
      }      
      else{
        setMode(true);
        localStorage.setItem('website_mode',true);
      }
  }
  const middlewire = () => {
    if (status == "unauthenticated") {
      return router.push("/login")
    } else {
      return router.push("/dashboard")
    }
  }

  const [email, setEmail] = useState("");
  // console.log(email);

  const sendEmail = async()=>{
    
    const res = await fetch("/api/mail", {
      method: "POST",
      header: {
          "Content-Type": "applications/json"
      },
      body: JSON.stringify({
        email
      })
    })

    setEmail("");
    toast.success("... email is successfully sent ...", {
      position: "top-center"
  })
  }
  return (
    <>
      {/* <Modal val={{type:"error",msg:"Error"}}></Modal> */}
      {/* <Modal val={{type:"success",msg:"Form data fetched successfully"}}></Modal> */}

      <div className={style.outer}>
        <div className={`${mode?style.header:dark.header}`}>
          <div className={`${mode?style.logo:dark.logo}`}>
            <div className={`${mode?style.company:dark.company}`}>
              <img src="favicon.png"></img>
              <h3>Think-Fast-Trivia</h3>
            </div>
          </div>
          <div className={`${mode?style.links:dark.links}`}>
            {/* <div className={style.company_name}>
                Think-Fast-Trivia
            </div> */}
            <div className={`${mode?style.form_portal:dark.form_portal}`}>
              <a onClick={middlewire} className={`${mode?style.linkTitle:dark.linkTitle}`}>
                Form-Portal
              </a>
            </div>
            <div className={`${mode?style.form_api:dark.form_api}`}>
              <a href="/api" className={`${mode?style.linkTitle:dark.linkTitle}`}>
                API
              </a>
            </div>
          </div>
          
          {
            status == "authenticated" ?
              <>
                {/* <div className={style.user_image}>
                    <img src={data.user.image} alt={data.user.name} height={50} width={50} />
                    <ul className={style.user_tags}>
                      <li>view profile</li>
                      <li>logout</li>
                    </ul>
                  </div> */}
                <ul className={`${mode?style.user_profile:dark.user_profile}`}>
                  <li>
                    <div className={`${mode?style.user_profile_header:dark.user_profile_header}`}>
                      <img src={data.user.image} alt={data.user.name} height={50} width={50} />
                      <h3>{user.name}</h3>
                    </div>
                    <ul className={`${mode?style.drop_down:dark.drop_down}`}>
                      <li> <Link href={"/analytics"} onClick={middlewire}> view profile </Link> </li>
                      <li><button onClick={() => { signOut() }}>Logout</button></li>
                    </ul>
                  </li>
                </ul>
              </>
              :
              <div className={`${mode?style.loginBtn:dark.loginBtn}`}>
                <Link href={"/login"}>
                  <button className={`${mode?style.button9:dark.button9}`}>Login</button>
                </Link>
              </div>
          }
          <div className={`${mode?style.iconGrid:dark.iconGrid}`} onClick={modeHandler}>
            <FaLightbulb className={`${mode?style.bulb:dark.bulb}`}></FaLightbulb>
          </div>
        </div>
      </div>
      <div className={`${mode?style.contentOuter:dark.contentOuter}`}>
      <div className={`${mode?style.content:dark.content}`}>
        <div className={`${mode?style.slogan:dark.slogan}`}>
          <h1>
            Show <span>Creativity.</span>
          </h1>
          <h1>
            {/* <span>Build</span> Community. */}
            <Typewriter
              options={{
                strings: ['Build Community', 'Spread Community', 'Grow Community'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className={`${mode?style.websiteDesc:dark.websiteDesc}`}>
            <p>
              Create custom forms and interactive quizzes effortlessly. Engage
              your audience and gather insights with ease on ThinkTankTrivia
            </p>
          </div>
          {
            status == "unauthenticated" ?
              <>
                <div className={`${mode?style.btn:dark.btn}`}>
                  <Link href={"/login"}><button className={`${mode?style.button68:dark.button68}`}>Get Started</button></Link>
                </div>
              </>
              :
              <div className={`${mode?style.btn:dark.btn}`}>
                <Link href={"/dashboard"}><button className={`${mode?style.button68:dark.button68}`}>Get Started</button></Link>
              </div>

          }
        </div>
        <div className={`${mode?style.sloganImage:dark.sloganImage}`}>
          <img src="74pZ.gif"></img>
        </div>
      </div >
      <div className={`${mode?style.working:dark.working}`}>
        <div className={`${mode?style.workingHeader:dark.workingHeader}`}>
          <h2>How it works</h2>
        </div>
        <div className={`${mode?style.createForm:dark.createForm}`}>
          <div className={`${mode?style.descIcon:dark.descIcon}`}></div>
          <div className={`${mode?style.descImg:dark.descImg}`}>
            <img src="Create-a-Form.png" height="100%" width="90%"></img>
          </div>
          <div className={`${mode?style.descContent:dark.descContent}`}>
            <div>
              <h2>Create Your Form</h2>
              <p>
              Welcome to the creative hub of Think Fast Trivia! With our "Create Your Form" feature, the power to craft engaging quizzes and forms is now at your fingertips. Unleash your creativity, challenge your friends, and spark exciting conversations with personalized quizzes tailored to your interests.
              </p>
            </div>
          </div>
        </div>
        <div className={`${mode?style.createForm:dark.createForm}`}>
          <div className={`${mode?style.descIcon:dark.descIcon}`}></div>
          <div className={`${mode?style.descImg:dark.descImg}`}>
            <img
              src="istockphoto-500641404-612x612.jpg"
              height="80%"
              width="90%"
            ></img>
          </div>
          <div className={`${mode?style.descContent:dark.descContent}`}>
            <div>
              <h2>Fill Your Form</h2>
              <p>
              Ready for a brain-teasing adventure? Dive into the diverse world of trivia crafted by the Think Fast Trivia community with our "Fill Your Form" feature. Whether you're a seasoned trivia enthusiast or a casual player, this is your chance to explore a multitude of quizzes and forms created by users just like you.
              </p>
            </div>
          </div>
        </div>
        <div className={`${mode?style.createForm:dark.createForm}`}>
          <div className={`${mode?style.descIcon:dark.descIcon}`}></div>
          <div className={`${mode?style.descImg:dark.descImg}`}>
            <img src="download.jpeg" height="90%" width="90%"></img>
          </div>
          <div className={`${mode?style.descContent:dark.descContent}`}>
            <div>
              <h2>Analyse Your Performance</h2>
              <p>
              Elevate your trivia game to new heights with the "Analyze Your Performance" feature on Think Fast Trivia. Dive into detailed insights and statistics that go beyond the thrill of answering questions. Understand your strengths, pinpoint areas for improvement, and track your progress as you embark on your trivia journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${mode?style.newFeature:dark.newFeature}`}>
        <div className={`${mode?style.featureTitle:dark.featureTitle}`}>
          <h2 className={`${mode?style.featureHeading:dark.featureHeading}`}>
            Tryout our<br></br>{" "}
            <span className={`${mode?style.black:dark.black}`}>new templates</span>
          </h2>
        </div>
        <div className={`${mode?style.featureImg:dark.featureImg}`}>
          <div className={`${mode?style.lightMode:dark.lightMode}`}>
            <div className={`${mode?style.icon:dark.icon}`}></div>
            <div className={`${mode?style.img:dark.img}`}>
              <img
                src="07100e0e7d47b0eb58f7cef3d5e19224.png"
                height="100%"
                width="100%"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className={`${mode?style.websiteApi:dark.websiteApi}`}>
        <h1 className={`${mode?style.apiHeading:dark.apiHeading}`}>
          Want<span className={`${mode?style.green:dark.green}`}> another feature?</span>
        </h1>
        <div className={`${mode?style.apiContent:dark.apiContent}`}>
          <div className={`${mode?style.apiHeading:dark.apiHeading}`}>
            <h1>
              Intoducing our<br></br>{" "}
              <span className={`${mode?style.brown:dark.brown}`}>new Feature</span>
            </h1>
            <button className={`${mode?style.button68:dark.button68}`}>Get API</button>
          </div>
          <div className={`${mode?style.apiImg:dark.apiImg}`}>
            <img src="Icons_API.png" height="100%" width="100%"></img>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <section className={`${mode?style.contributors:dark.contributors}`}>
          <h2>Contributors</h2>
          <div className={style.profiles}>
            {github && 
              contributors.map(function (data) {
                return <div className={style.profile} key={data.id}>
                        <a href={data.html_url}>
                        <img src={data.avatar_url}></img>
                        <h3>{data.login}</h3>
                        </a>
                      </div>
              })
            }
            {
              !github && <h1>Loading...</h1>
            }
          </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
      <div className={`${mode?style.footer_outer:dark.footer_outer}`}>
        <footer className={`${mode?style.footer:dark.footer}`}>
          <div className={`${mode?style.connectInvite:dark.connectInvite}`}>
            <div className={`${mode?style.title:dark.title}`}>
              <span>Invite your friend</span>
            </div>
            <div className={`${mode?style.input:dark.input}`}>
              <input
                name="email"
                placeholder="Enter the Email"
                type="email"
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
                value={email}
              ></input>
            </div>
            <div className={`${mode?style.btn:dark.btn}`} onClick={sendEmail}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="green"
                height="2em"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              {/* <button className={style.mail} type="submit">send</button> */}
            </div>
          </div>
          <hr></hr>
          <div className={`${mode?style.socialMedia:dark.socialMedia}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="1em"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </div>
          <hr></hr>
          <div className={`${mode?style.footerLinks:dark.footerLinks}`}>
            <div className={`${mode?style.headerlinks:dark.headerlinks}`}>
              <div className={`${mode?style.general:dark.general}`}>
                <h2>General</h2>
                <div>
                  <a href="">About</a>
                  <br></br>
                  <a href="">Term and Condiiton</a>
                  <br></br>
                  <a href="">Privacy</a>
                </div>
              </div>
              <div className={`${mode?style.account:dark.account}`}>
                <h2>Account</h2>
                <div>
                  <a href="">Login</a>
                  <br></br>
                  <a href="">Signup</a>
                  <br></br>
                  <a href="">API Request</a>
                </div>
              </div>
            </div>
            <div className={`${mode?style.title:dark.title}`}>
              <h1>ThinkFastTrivia</h1>
            </div>
          </div>
          <div className={`${mode?style.copyright:dark.copyright}`}>
            <p>Copyright reserved by ThinkFastTrivia</p>
          </div>
        </footer>
      </div>
      <ChatIcon />
    </>
  );
}
