import Link from "next/link"
import { FaDiscord, FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa/"
import { FaTwitter } from "react-icons/fa/"

export default function Footer() {
  return (
    <div className="container-lg p-0 mb-0 bg-black bg-opacity-100 px-0 lg:px-0">
      <div className="container flex flex-col mx-auto gap-0 text-white">
        {/* <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0 py-10 text-xs tracking-widest font-semibold uppercase text-gray-200 text-center">

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/calculadora">Calculadora</Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/sobre">Sobre</Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/guias-de-uso">Guia de uso</Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/metodologia">Metodologia </Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/publicacoes">Publicações</Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/equipe">Equipe </Link>
            </div>
          </div>

          <div className="flex">
            <div className="hover:underline underline-offset-8 hover:text-gray-300">
              <Link href="/contato">Contato</Link>
            </div>
          </div>
        </div> */}

        <div className="container-lg flex justify-between items-end py-6 bg-black px-6 max-[530px]:flex-col-reverse max-[530px]:gap-4 max-[530px]:items-center">
          <div className="text-sm text-white">
            &#169; CSF All rights reserved
          </div>
          <div className="flex gap-5 text-gray-500">
            <a
                className="hover:text-white"
                href="https://www.conservation-strategy.org/"
                target="_blank"
                rel="noreferrer"
              >
                <GlobeIcon />{" "}
              </a>
            <a
                className="hover:text-white"
                href="https://www.linkedin.com/company/conservationstrategyfund/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size={24} />{" "}
              </a>
              <a
                className="hover:text-white"
                href="https://www.youtube.com/user/numbers4nature"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube size={24} />{" "}
              </a>
              <a
                className="hover:text-white"
                href="https://www.instagram.com/conservationstrategyfund/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={24} />
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
                <FaFacebook size={24} />{" "}
              </a>
          </div>
        </div>
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
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.6526 3.80782H43.3995L28.6594 20.6548L46 43.5798H32.4225L21.7881 29.6759L9.61989 43.5798H2.86886L18.6349 25.56L2 3.80782H15.9222L25.5348 16.5165L36.6526 3.80782ZM34.2846 39.5414H38.0232L13.8908 7.63408H9.87892L34.2846 39.5414Z" fill="currentColor"/>
    </svg>
  )
}
