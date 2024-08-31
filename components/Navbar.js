import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react"
import { Language, PORTUGUES, ENGLISH } from "../context/provider";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Divider, Menu, MenuItem, styled, Switch } from "@mui/material";
import styles from '../styles/Navbar.module.css';
import LanguageToggle from "./LanguageToggle";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    disableScrollLock={true}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    padding: 2,
    backgroundColor: 'rgb(0, 0, 0)',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    color: theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:hover': {
        backgroundColor: 'rgba(73, 222, 128, 0.5)',
      },
      '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const { content, language, setLanguage } = useContext(Language);
  const { navbar } = content;

  const [hasScrolled, setHasScrolled] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null);
  const open = Boolean(languageMenuAnchorEl);

  const handleLanguageButtonClick = (event) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  const handleChangeLanguage = (language) => {
    if(language === PORTUGUES)
      setLanguage(PORTUGUES);
    else if(language === ENGLISH)
      setLanguage(ENGLISH)
    else
      console.error('wrong language context');
    handleLanguageMenuClose();
  }
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsDropdownOpen(false);
    };

    // Close dropdown on route change
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isDropdownOpen, router]);

  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  }

  return (
    <div 
      className={`
        container-lg sticky top-0 flex py-6 max-[500px]:px-8 px-14 bg-[#0A0F0F] bg-opacity-100 z-20 transition-opacity duration-300
        ${hasScrolled ? 'opacity-90' : 'opacity-100'}
      `}
    > 
      <div className="w-full max-w-screen-sm md:max-w-screen-2xl mx-auto flex gap-12 justify-between items-center">
        <div className="justify-start items-end pl-2">
          {" "}
          {/*Left area*/}
          <div className="flex items-center gap-12">
            <button>
              <Link href="/">
                <Image
                  // className="w-[70px]"
                  // src="/images/Desmatamento_VersãoInvertida.svg"
                  src="/images/logo-desmatamento.svg"
                  alt="Calculadora Desmatamento Logo"
                  width={60}
                  height={60}
                  sizes="(max-width: 1024px) 40px, 60px"
                  priority
                />
              </Link>
            </button>
            {/* <span className="text-white font-bold text-[1.125rem]">
              {navbar.title_CSF}
            </span> */}
          </div>
        </div>
        {/* center-area */}
        {/* <div className="flex items-center gap-8 justify-start lg:justify-end items-end lg:pt-0 hidden lg:flex pr-0">
              {" "}
              <ul className="flex gap-8 min-[1280px]:gap-14 text-gray-100 text-[0.875rem] tracking-widest font-semibold uppercase">
                {navbar.menu.map((item) => (
                  <li key={item.label} className="hover:underline underline-offset-8 hover:text-white">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}                
              </ul>
        </div> */}

        <div className="block lg:hidden text-white">
          <button onClick={handleOpenDropdown}>
            <MenuIcon />
          </button>
        </div>
        {/* overlay */}
        {
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-[#0A0F0F] bg-opacity-[0.95] flex flex-col justify-between items-center transition-opacity duration-300 ease-in-out ${
              isDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="w-full flex justify-between px-10 py-4">
              <div className="text-white text-2xl font-bold">
                <Image
                    className="w-10 lg:w-16"
                    src="/images/logo.svg"
                    alt="CSF Logo"
                    width={64}
                    height={64}
                    sizes="(max-width: 1024px) 40px, 64px"
                    priority
                />
              </div>
              <button className="text-white" onClick={handleCloseDropdown}>
                <CloseIcon />
              </button>
            </div>
            <div className="flex w-full h-full justify-center items-center">
              <ul className="flex flex-col justify-center items-center gap-10 text-gray-100 text-2xl tracking-widest font-semibold uppercase">
                {navbar.menu.map((item) => (
                  <li key={item.label} className="text-center hover:underline underline-offset-8 hover:text-white">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <LanguageToggle onLanguageChange={handleChangeLanguage} />
                </li>
              </ul>  
            </div>
          </div>
        }

        <div className="flex items-center gap-8 justify-start lg:justify-end items-end lg:pt-0 hidden lg:flex pr-0">
          {" "}
          {/*Right area*/}
          <ul className="flex gap-8 text-gray-100 text-[0.875rem] tracking-widest font-semibold uppercase">
            {navbar.menu.map((item) => (
              <li key={item.label} className="hover:underline underline-offset-8 hover:text-white">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button 
              className={`${styles.language} relative uppercase text-[0.875rem] text-white font-semibold flex items-center gap-1`}
              // onClick={onChangeLanguage}
              onClick={handleLanguageButtonClick}
            >
              {language}
              <RiArrowDropDownLine color="white" size={24} />
            </button>
            <StyledMenu
              elevation={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={languageMenuAnchorEl}
              open={open}
              onClose={handleLanguageMenuClose}
              
            >
              <MenuItem onClick={() => handleChangeLanguage(PORTUGUES)} disableRipple>
                Português
              </MenuItem>
              <MenuItem onClick={() => handleChangeLanguage(ENGLISH)} disableRipple>
                English
              </MenuItem>
            </StyledMenu>
            <Divider orientation="vertical" color="#F7EEEE" sx={{ opacity: 0.3, width: '1.5px' }} flexItem />
            <a
            href="https://www.conservation-strategy.org/"
            target="_blank"
            className="cursor-pointer"
            >
              <Image
                // className="w-14"
                className="opacity-[0.6] ml-2"
                src="/images/logo.svg"
                alt="CSF Logo"
                width={34}
                height={34}
                sizes="(max-width: 1024px) 40px, 34px"
                priority
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icon-tabler-menu-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icon-tabler-x"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

const DownChevron = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
  )
}
