import React from 'react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../assets/images/banner.jpeg'
import model from '../assets/images/models.png'
import FeatureComponent from '../components/FeatureComponent'
import OverviewComponent from '../components/OverviewComponent'
import { motion } from "motion/react"
import options from '../data/scrollData'
import Profile from '../data/Profile'
import { FaWhatsapp,FaInstagram, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import NavBar from '../components/NavBar'


const LandingPage = () => {
  const navigate = useNavigate()
  const [currentIndex, setcurrentIndex] = useState(0);
  const [text,setText] = useState("");
  const fullName = Profile.name
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    navigate('/foods')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  

  useEffect(()=>{
    let index = 1;
    let isDealing = false;
    const interval = setInterval(() => {
      if(!isDealing){
        setText(fullName.slice(0,index));
        index++;
        if(index > fullName.length){
          isDealing = true;
          setTimeout(() => {},1000);
        }
      }else{
        setText(fullName.slice(0,index));
        index--;
        if(index < 0){
          isDealing = false;
          index=1;
        }
      }
    },200);
    return () => clearInterval(interval);
    },[])


  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentIndex((prevIndex) => (prevIndex + 1) % Profile.img.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [Profile.img.length]);
  return (
    <div className="w-screen overflow-hidden">
      <NavBar isVisible={isVisible} />
      <div className="flex flex-col min-h-screen bg-blue-500 justify-center overflow-hidden relative">
        <img
          className="h-[100vh] w-screen absolute top-0 left-0 overflow-y-hidden" 
          src={banner} 
          alt=""
        />
        <div className="h-[100vh] w-screen absolute bg-gradient-to-b from-white/10 to-white/100"></div>

        {/* Purple Shapes */}
        <motion.div initial={{opacity: 0}}
        animate = {{opacity:1}}
        transition={{duration:0.2}}  
        className="w-[350px] h-[330px] rounded-bl-full absolute top-0 right-0 border-[30px] border-[#6948DF] border-r-0 border-t-0"></motion.div>
        <motion.div  initial={{opacity: 0}}
        animate = {{opacity:1}}
        transition={{duration: 0.3}} className="w-[270px] h-[250px] rounded-bl-full absolute top-0 right-0 border-[30px] border-[#6948DF] border-r-0 border-t-0"></motion.div>
        <motion.div initial={{opacity: 0}}
        animate = {{opacity:1}}
        transition={{duration: 0.3}}  className="w-[150px] h-[130px] bg-[#6948DF] absolute rounded-bl-full top-0 right-0"></motion.div>

        {/* Content */}
        <div className="grid grid-cols-2 w-full px-10 z-10 relative">
          {/* Left Content */}
          <div className="ml-[150px] mt-[120px] items-center relative z-10">
            <motion.h1
            initial={{ opacity: 0 , y:50}}
            animate={{ opacity: 1 , y:0}}
            transition={{ duration: 0.2, delay: 0 }}
            className="text-8xl text-black font-bold absolute z-20 ml-[40px] mt-5 font-julee">WeirdEats</motion.h1>
            <motion.div
            initial={{ opacity: 0 , y:50}}
            animate={{ opacity: 1 , y:0}}
            transition={{ duration: 0.2, delay: 0 }} className="w-[130px] h-[130px] bg-[#6948DF] rounded-full animate-floating"></motion.div>
            <motion.p
            initial={{ opacity: 0 , y:50}}
            animate={{ opacity: 1 , y:0}}
            transition={{ duration: 0.2, delay: 0 }} className="text-center text-3xl mt-[30px] font-kaushan font-extralight leading-12 z-20 relative">
              "Breaking the Rules of Taste – <br/> Because the Best Flavors Are <br /> the Unexpected Ones!"
            </motion.p>

            {/* 🔥 Buttons - Now Visible! */}
            <div className="flex justify-center items-center flex-col relative z-20">
              <motion.button initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick} 
              className="h-[50px] w-[250px] bg-[#6948DF] mt-[30px] text-white rounded-[15px] font-bold hover:scale-110 transition duration-300">
                Explore Food Combinations
              </motion.button>
              <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} 
              className="h-[50px] w-[250px] bg-white/10 mt-[30px] text-black rounded-[15px] border-2 border-[#6948DF] font-bold hover:scale-110 transition duration-300 hover:text-white hover:bg-[#6948DF]">
                Add New Combination
              </motion.button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center relative z-10">
            <img
              className="z-10 bottom-0 h-screen scale-x-[-1] mr-8"
              src={model}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div>
        <FeatureComponent/>
      </div>
      <div>
        <OverviewComponent/>
      </div>
      <div className="relative w-full h-[120px] bg-[#6948DF] overflow-hidden flex items-center text-center">

        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }} // Dynamic width
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {options.concat(options).map((option, index) => (
          <span key={index} className="text-white text-2xl font-bold flex items-center  capitalize">
            {option} {index !== options.concat(options).length - 1 && <span className="text-gray-400 mx-8">|</span>}
          </span>
          ))}
        </motion.div>
      
      </div>
      <div className='mt-4 flex justify-center items-center'>
        <div className='w-[800px] h-[300px] bg-[#6948DF]/40 m-6 rounded-lg shadow-lg shadow-black border-2 border-[#6948DF]' >
          <div className='grid grid-cols-[200px_auto] w-full h-full p-4'>
            <div className='  w-[200px] h-full rounded-md '>
              <img 
              className=' rounded-md object-cover w-full h-full shadow-lg shadow-black'
              src={Profile.img[currentIndex]} alt="" />
            </div>
            <div className='flex flex-col justify-center items-center  w-full h-full '>
              <h2 className='text-black font-kaushan text-[23px] relative z-10 font-bold p-2'>{Profile.tittle}</h2>
              <div className='h-[40px]'>
              <h2 className='text-black font-marker text-[28px] relative z-10 font-bold p-2 uppercase'>{text}</h2>
              </div>
              <div className='w-[400px] mt-5 text-center font-semibold'>
                <p>{Profile.bio}</p>
              </div>
              <div className='flex flex-row justify-center items-center gap-10 mt-4'>
                <a href={Profile.instaLink} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-8 h-8 text-pink-500 hover:text-pink-600 transition duration-300" />
                </a>

                <a href={Profile.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-8 h-8 text-gray-800 hover:text-gray-600 transition duration-300" />
                </a>
                <a href={Profile.LinkedInLink} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-8 h-8 text-blue-500 hover:text-blue-600 transition duration-300" />
                </a>
                <a href={Profile.portfolioLink} target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="w-8 h-8 text-rose-500 hover:text-rose-600 transition duration-300" />
                </a>
                <a href={Profile.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-8 h-8 text-green-500 hover:text-green-600 transition duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[200px] bg-[#6948DF] mt-6 grid grid-cols-[auto_40px_auto]'>
            <div className='relative flex  flex-col items-center justify-center'>
                <h1 className='text-black font-julee text-6xl relative z-10'>WeirdEats</h1>
                <div className='w-[80px] h-[80px] rounded-full bg-white absolute mr-[200px] animate-floating'></div>
            </div>
            <div className='relative flex  flex-col items-center justify-center'>
              <div className='w-[2px] h-[160px] bg-white absolute'></div>
            </div>
            <div className='flex justify-center items-center gap-8'>
              <div className='flex flex-col justify-center items-center font-semibold text-center p-3'>
                  <p className='p-1'>Home</p>
                  <p className='p-1' >Explore Foods</p>
                  <p className='p-1'>Add Food</p>
                  <p className='p-1'>About</p>
              </div>
              <div className='flex flex-col justify-center items-center font-semibold'>
                  <p className='p-1'>My Choices</p>
                  <p className='p-1'>My Contact</p>
                  <p className='p-1'>Highest Liked</p>
                  <p className='p-1'>Contact</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default LandingPage
