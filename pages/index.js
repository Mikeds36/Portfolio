import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";

function Header() {
  return (
      <Head>
          <title>Mikeds&apos; Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width; height=device-height"/>
          <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}

function SiteHeader() {
    return (
        <header className={styles.header}>
            <ul>
                <li>
                    <a href={'#About'}>About</a>
                </li>
                <li>
                    <a href={'#Skill'}>Skills</a>
                </li>
                <li>
                    <a href={"#Work"}>Work</a>
                </li>
                <li>
                    <a href={"#Contact"}>Contact</a>
                </li>
            </ul>
        </header>
    )
}

function Main() {
    return (
        <main className={styles.main}>
            <SiteHeader />
            <MainArticle />
            <AboutArticle />
            <SkillArticle />
            <WorkArticle />
            <ContactArticle />
            <Footer />
        </main>
    )
}

function MainArticle() {
    return (
        <article id={'main'} className={styles['main-article']}>
            <h1>Mikeds</h1>
            <hr />
            <h2>프로그래머 지망</h2>
        </article>
    )
}

function AboutArticle() {
    return (
        <article id={'About'} className={styles['main-article']}>
            <h1>Mikeds</h1>
            <hr />
            <h2>프로그래머 지망</h2>
        </article>
    )
}

function SkillArticle() {
    return (
        <article id={'Skill'} className={styles['skill-article']}>
            <div>
                <h1>I used to do things like this</h1>
                <hr />
                <div className={styles['skill-image']}>
                    <Image src="/Skill/php-logo.webp" alt="PHP Logo" width={100} height={47} priority={true} />
                    <Image src="/Skill/html5-logo.webp" alt="HTML5 Logo" width={70} height={108} priority={true}/>
                    <Image src="/Skill/node-sass-logo.webp" alt="Sass Logo" width={91} height={108} priority={true}/>
                    <Image src="/Skill/javascript-logo.webp" alt="Javascript Logo" width={108} height={108} priority={true}/>
                    <Image src="/Skill/Daco_2563210.webp" alt="SQL Logo" width={136} height={62} priority={true}/>
                </div>
            </div>

            <div>
                <h1>And i also did these things</h1>
                <hr />
                <div className={styles['skill-image']}>
                    <Image src="/Skill/python-logo.webp" alt="Python Logo" width={108} height={108} priority={true}/>
                    <Image src="/Skill/linux-logo-1.webp" alt="Linux Logo" width={108} height={108} priority={true} />
                    <Image src="/Skill/raspberry-pi-logo.webp" alt="C Logo" width={80} height={108} priority={true} />
                    <Image src="/Skill/c-logo-1.webp" alt="C Logo" width={93} height={108} priority={true} />
                    <Image src="/Skill/java-logo-1.webp" alt="C Logo" width={108} height={108} priority={true} />
                </div>
            </div>
        </article>
    )
}

function WorkArticle() {
    return (
        <article id={"Work"} className={styles['work-article']}>

        </article>
    )
}

function ContactArticle() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('sending')

        let data = {
            name,
            email,
            subject,
            message
        }

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
                setSubmitted(true)
                setName('')
                setEmail('')
                setSubject('')
                setMessage('')
            }
        })
    }

    return (
        <article id={"Contact"} className={styles['contact-article']}>
            <div className={styles['contact-title']}>
                <h1>CONTACT ME</h1>
                <hr />
            </div>
            <form className={styles['contact-form']}>
                <input
                    id={"name"}
                    type={"text"}
                    onChange={(e) => {setName(e.target.value)}}
                    className={styles['contact-form_input']}
                    placeholder={"Name"}/>
                <input
                    id={"email"}
                    type={"email"}
                    onChange={(e) => {setEmail(e.target.value)}}
                    className={styles['contact-form_input']}
                    placeholder={"Email"}/>
                <input
                    id={"subject"}
                    type={"text"}
                    onChange={(e) => {setSubject(e.target.value)}}
                    className={styles['contact-form_input']}
                    placeholder={"Subject"}/>

                <textarea
                    id={"message"}
                    onChange={(e) => {setMessage(e.target.value)}}
                    className={styles['contact-form_input']}
                    placeholder={"Message"} />
                <input
                    type="submit"
                    className={styles['contact-form_input']}
                    value={"Submit"}
                    onClick={(e) => {handleSubmit(e)}}
                />
            </form>

        </article>
    )
}

function Footer() {
  return (
      <footer className={styles.footer}>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
      </footer>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
        <Header />
        <Main />
    </div>
  )
}
