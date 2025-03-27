import { useCallback, useContext } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa/"
import Image from "next/image";
import { useRouter } from "next/router";
import { Language } from "../context/provider";


export default function Footer() {
  const router = useRouter();
  const { content } = useContext(Language);
  const { footer } = content;

  const handleIconClick = useCallback(() => {
    const isHome = router.pathname === '/';
    if(!isHome) {
      router.push('/');
    } else {
      setTimeout(() => window.scrollTo({ top:0, behavior: 'smooth' }), 100);
    }
  },[router]);

  return (
    <div className="container-lg p-0 mb-0 bg-black bg-opacity-100 px-0 lg:px-0">
      <div className="flex flex-col gap-0 text-white">
        <div className="container-lg py-6 bg-black max-[500px]:px-8 px-14 ">
          <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-center ">
            <div>
              <div className="flex items-center gap-12 md:gap-12">
                <div 
                className="cursor-pointer"
                onClick={handleIconClick}
                >
                  <Image
                    // src="/images/Desmatamento_VersãoInvertida.svg"
                    src="/images/logo-desmatamento-color.png"
                    alt="Calculadora Desmatamento Logo"
                    width={44}
                    height={44}
                    priority
                  />
                </div>
                <a
                href="https://miningcalculator.conservation-strategy.org/"
                target="_blank"
                className="cursor-pointer"
                >
                  <Image
                    // src="images/Garimpo_VersãoInvertida.svg"
                    src="/images/logo-garimpo-color.png"
                    alt="CSF Logo"
                    width={44}
                    height={44}
                    priority
                  />
                </a>
                <a 
                href="https://indigenouscalculator.conservation-strategy.org/home"
                target="_blank"
                className="cursor-pointer"
                >
                  <Image
                    // src="images/Indígena_VersãoInvertida.svg"
                    src="/images/logo-indigena-color.png"
                    alt="CSF Logo"
                    width={44}
                    height={44}
                    priority
                  />
                </a>
                {/* <a>
                  <GarimpoIcon/>
                </a>
                <a>
                  <IndigenaIcon />
                </a> */}
              </div>
              {/* <div className="flex w-full justify-center pb-2 text-sm text-white font-medium pt-2">
                &#169; CSF All rights reserved
              </div> */}
            </div>
            <div className="flex gap-8 min-[425px]:gap-12 text-gray-500">
              <a
                  className="hover:text-white"
                  href="https://www.linkedin.com/company/conservationstrategyfund/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin size={28} />{" "}
                </a>
                <a
                  className="hover:text-white"
                  href="https://www.youtube.com/user/numbers4nature"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaYoutube size={28} />{" "}
                </a>
                <a
                  className="hover:text-white"
                  href="https://www.instagram.com/conservationstrategyfund/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram size={28} />
                </a>
                <a
                  className="hover:text-white"
                  href="https://bsky.app/profile/numbers4nature.bsky.social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBlueSky size={28}/>
                </a>              
                <a
                  className="hover:text-white"
                  href="https://www.facebook.com/conservationstrategyfund"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size={28} />{" "}
                </a>
            </div>
          </div>
        </div>
        <div className="opacity-50 border-t-[1px] border-[#404040] max-[500px]:px-8 px-14 py-4 flex gap-3 w-full justify-start items-center max-[839px]:justify-center text-sm text-white font-medium">
          {/* <a
            className="hover:text-white"
            href="https://www.conservation-strategy.org/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/images/logo.svg"
              alt="CSF Logo"
              width={36}
              height={36}
              sizes="(max-width: 1024px) 40px, 64px"
              priority
            />
          </a> */}
          <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto flex gap-1 items-center font-normal max-[839px]:text-xs max-[839px]:flex-col">
            <span>
              <span className="font-medium whitespace-nowrap">&#169; CSF</span>
              &nbsp;&middot;&nbsp;
              <span className="font-medium whitespace-nowrap">{footer.rights}</span>
              <span className="max-[839px]:hidden">&nbsp;&middot;&nbsp;</span>
            </span>
            <span className="opacity-90 text-white max-[839px]:text-center">{footer.disclaimer}</span>
          </div>
        </div>
        {/* <div className="flex w-full justify-center items-center mb-5 max-[500px]:px-8 px-14 ">
          <span className="opacity-50 text-white text-xs pt-4">{footer.disclaimer}</span>
        </div> */}
      </div>
    </div>
  )
}

const GlobeIcon = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
  )
}

const XIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.6526 3.80782H43.3995L28.6594 20.6548L46 43.5798H32.4225L21.7881 29.6759L9.61989 43.5798H2.86886L18.6349 25.56L2 3.80782H15.9222L25.5348 16.5165L36.6526 3.80782ZM34.2846 39.5414H38.0232L13.8908 7.63408H9.87892L34.2846 39.5414Z" fill="currentColor"/>
    </svg>
  )
}

const baseWidth = '56px';

const GarimpoIcon = () => {
  /* x=0.708590801 */
  /* 1/aspect-ratio=1.1424 */
  return (
    <div style={{ aspectRatio: 0.875370803, height: `calc(${baseWidth}*1.1424)`, width: 'auto' }}>
      <Image
        // className="h-[calc(56px*1.1424)]"
        src="images/Garimpo_VersãoInvertida.svg"
        alt="CSF Logo"
        width={0}
        height={0}
        // sizes="(max-width: 1024px) 40px, 64px"
        priority
        style={{ height: '100%', width: 'auto' }}
      />
    </div>
  )
}

const IndigenaIcon = () => {
  /* x=0.525262077 */
  /* aspectRatio=0.875370803 */
  /* 1/x=1.9038 */
  return (
    <div style={{ aspectRatio: 0.799779848, height: `calc(${baseWidth}*1.1424*0.7086*1.9038)` }}>      
      <Image
        // className="h-[calc(56px*1.1424*0.7086*1.4112*1.9038)]"
        src="images/Indígena_VersãoInvertida.svg"
        alt="CSF Logo"
        width={0}
        height={0}
        // sizes="(max-width: 1024px) 40px, 64px"
        priority
        style={{ height: '100%', width: 'auto' }}
      />
    </div>
  )  
}

const IconBlueSky = ({ size }) => {
  return (
    <div
    style={{ width: `${size}px`}}
    >
      <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.31076 4.45666C10.1195 6.57247 13.141 10.8619 14.25 13.1637V19.2436C14.25 19.1142 14.2002 19.2604 14.093 19.5755C13.5142 21.2813 11.2533 27.9388 6.08346 22.6165C3.36128 19.8143 4.6215 17.0121 9.57662 16.1661C6.7419 16.65 3.55498 15.8503 2.68064 12.7151C2.42875 11.8132 2 6.2578 2 5.50748C2 1.74903 5.28415 2.93039 7.31076 4.45666ZM21.1892 4.45666C18.3805 6.57247 15.359 10.8619 14.25 13.1637V19.2436C14.25 19.1142 14.2998 19.2604 14.407 19.5755C14.9858 21.2813 17.2467 27.9388 22.4165 22.6165C25.1387 19.8143 23.8785 17.0121 18.9234 16.1661C21.7581 16.65 24.945 15.8503 25.8194 12.7151C26.0712 11.8132 26.5 6.2578 26.5 5.50748C26.5 1.74903 23.2162 2.93039 21.1892 4.45666Z" fill="currentColor"/>
      </svg>
    </div>
  )
}