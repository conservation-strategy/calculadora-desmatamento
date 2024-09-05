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
      <div className="mx-auto max-w-screen-sm md:max-w-screen-2xl  flex flex-col gap-0 text-white">
        <div className="container-lg flex flex-col md:flex-row gap-8 justify-between items-center py-6 bg-black max-[500px]:px-8 px-14 ">
          <div>
            <div className="flex items-center gap-12 md:gap-12">
              <div 
              className="cursor-pointer"
              onClick={handleIconClick}
              >
                <Image
                  // className="w-[70px]"
                  src="/images/Desmatamento_VersãoInvertida.svg"
                  // src="/images/logo-desmatamento3.svg"
                  alt="Calculadora Desmatamento Logo"
                  width={44}
                  height={44}
                  // sizes="(max-width: 1024px) 40px, 60px"
                  priority
                />
              </div>
              <a
              href="https://miningcalculator.conservation-strategy.org/"
              target="_blank"
              className="cursor-pointer"
              >
                <Image
                  // className="h-[calc(56px*1.1424)]"
                  src="images/Garimpo_VersãoInvertida.svg"
                  alt="CSF Logo"
                  width={44}
                  height={44}
                  // sizes="(max-width: 1024px) 40px, 60px"
                  priority
                />
              </a>
              <a 
              href="https://indigenouscalculator.conservation-strategy.org/home"
              target="_blank"
              className="cursor-pointer"
              >
                <Image
                  // className="h-[calc(56px*1.1424*0.7086*1.4112*1.9038)]"
                  src="images/Indígena_VersãoInvertida.svg"
                  alt="CSF Logo"
                  width={44}
                  height={44}
                  // sizes="(max-width: 1024px) 40px, 60px"
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
                href="https://x.com/numbers4nature"
                target="_blank"
                rel="noreferrer"
              >
                <XIcon />
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
        <div className="opacity-50 border-y-[1px] border-[#404040] max-[500px]:px-8 px-14 py-4 mb-2 flex gap-3 w-full justify-start items-center text-sm text-white font-medium">
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
          <div className="flex gap-1 items-center font-normal">
            <span className="font-medium">&#169; CSF </span> &middot; <span className="font-medium">{footer.rights}</span> &middot; <span className="opacity-90 text-white">{footer.disclaimer}</span>
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
