'use client'
import './style.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Page() {
  const mainSection = useRef(null)
  const itemsContainer = useRef(null)

  useEffect(() => {
    const items = document.querySelectorAll('.MainSectionItem')
    const innerItems = document.querySelectorAll('.MainSectionItem-inner')
    const mediaContainers = document.querySelectorAll('.MainSectionItem-mediaContainer')
    const mediaContainersInner = document.querySelectorAll('.MainSectionItem-mediaContainerInner')
    const navProgressBar = document.querySelectorAll('.MainSection-navProgressBar')
    const innerStickies = document.querySelectorAll('.MainSectionItem-innerSticky')
    const medias = document.querySelectorAll('.MainSectionItem-media')
    const headerTitle = document.querySelector('.MainSection-headerTitle')
    const navItemTitles = document.querySelectorAll('.MainSection-navItemTitle')

    navItemTitles.forEach((item, i) => {
      gsap.set(item, {
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        transform: 'translate3d(0px, 5rem, 0px)',
      })
    })

    medias.forEach((media) => {
      gsap.set(media, { aspectRatio: 1.3793103448275863 })
    })

    let splitheaderTitle = SplitText.create(headerTitle, {
      type: 'chars, words',
      charsClass: 'chars',
    })
    gsap.from(splitheaderTitle.chars, {
      y: 50,
      opacity: 0,
      transformOrigin: '0% 50% -50',
      stagger: 0.05,
      duration: 2,
      ease: 'none',
      onComplete: () => {
        headerTitle.removeAttribute('aria-hidden')
      },
    })

    let mm = gsap.matchMedia()

    mm.add('(max-width: 1439px)', () => {
      gsap.set(items, { clearProps: 'all' })
      gsap.set(innerItems, { clearProps: 'all' })
      gsap.set(mediaContainers, { clearProps: 'all' })
      gsap.set(mediaContainersInner, { clearProps: 'all' })

      const mobile = gsap.context(() => {
        innerStickies.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: item.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom',
            endTrigger: innerStickies[i + 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            markers: false,
          })
        })
      }, itemsContainer.current)
      return () => mobile.revert()
    })

    mm.add('(min-width: 1440px)', () => {
      gsap.set(items, { clearProps: 'all' })
      gsap.set(innerItems, { clearProps: 'all' })
      gsap.set(mediaContainers, { clearProps: 'all' })
      gsap.set(mediaContainersInner, { clearProps: 'all' })
      gsap.set(navProgressBar, { clearProps: 'all' })
      
      const desktop = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainSection.current,
            start: 'top top',
            end: `+=${items.length * 100}%`,
            pin: true,
            scrub: 1, // true
            invalidateOnRefresh: true,
            markers: false,
          },
          defaults: { ease: 'none' },
        })
      
        tl.add(() => {
          tl.addLabel('progress-bar')
          tl.fromTo(navProgressBar, { xPercent: -85 }, { xPercent: 0, duration: tl.duration(), ease: 'none' }, 0)
        })

        // --- Phase 1 ---
        tl.addLabel('phase-1')
        tl.fromTo(items[0], { xPercent: 0 }, { xPercent: -100 })
        tl.fromTo(innerItems[0], { xPercent: 0 }, { xPercent: 100 }, '<')
        tl.fromTo(mediaContainers[0], { xPercent: -60, scale: 1, transformOrigin: '100% 100% 0px' }, { xPercent: -150, scale: 0.8 }, '<')
        tl.fromTo(mediaContainersInner[0], { xPercent: 0, scale: 1, transformOrigin: '50% 50% 0px' }, { xPercent: -150, scale: 1.2 }, '<')
        tl.fromTo(items[1], { xPercent: 80 }, { xPercent: 0 }, '<')
        tl.fromTo(innerItems[1], { xPercent: -80 }, { xPercent: 0 }, '<')
        tl.fromTo(mediaContainers[1], { xPercent: -15, scale: 0.45, transformOrigin: '100% 100% 0px' }, { xPercent: -60, scale: 1.0 }, '<')
        tl.fromTo(mediaContainersInner[1], { scale: 1.55, transformOrigin: '50% 50% 0px' }, { scale: 1.0 }, '<')
        tl.fromTo(items[2], { xPercent: 95 }, { xPercent: 80 }, '<')
        tl.fromTo(innerItems[2], { xPercent: -95 }, { xPercent: -80 }, '<')
        tl.fromTo(mediaContainers[2], { xPercent: 0, scale: 0.15, transformOrigin: '100% 100% 0px' }, { xPercent: -15, scale: 0.45 }, '<')
        tl.fromTo(mediaContainersInner[2], { scale: 1.85, transformOrigin: '50% 50% 0px' }, { scale: 1.55 }, '<')
        tl.fromTo(items[3], { xPercent: 100 }, { xPercent: 95 }, '<')
        tl.fromTo(innerItems[3], { xPercent: -100 }, { xPercent: -95 }, '<')
        tl.fromTo(mediaContainers[3], { scale: 0, transformOrigin: '100% 100% 0px' }, { scale: 0.15 }, '<')
        tl.fromTo(mediaContainersInner[3], { scale: 2, transformOrigin: '50% 50% 0px' }, { scale: 1.85 }, '<')
        
        // --- Phase 2 ---
        tl.addLabel('phase-2', '>')
        tl.fromTo(items[1], { xPercent: 0 }, { xPercent: -100 })
        tl.fromTo(innerItems[1], { xPercent: 0 }, { xPercent: 100 }, '<')
        tl.fromTo(mediaContainers[1], { xPercent: -60, scale: 1.0, transformOrigin: '100% 100% 0px' }, { xPercent: -150, scale: 0.8 }, '<')
        tl.fromTo(mediaContainersInner[1], { scale: 1.0, transformOrigin: '50% 50% 0px' }, { scale: 1.2 }, '<')
        tl.fromTo(items[2], { xPercent: 80 }, { xPercent: 0 }, '<')
        tl.fromTo(innerItems[2], { xPercent: -80 }, { xPercent: 0 }, '<')
        tl.fromTo(mediaContainers[2], { xPercent: -15, scale: 0.45, transformOrigin: '100% 100% 0px' }, { xPercent: -60, scale: 1.0 }, '<')
        tl.fromTo(mediaContainersInner[2],{ scale: 1.55, transformOrigin: '50% 50% 0px' },{ scale: 1.0 },'<')
        tl.fromTo(items[3], { xPercent: 95 }, { xPercent: 80 }, '<')
        tl.fromTo(innerItems[3], { xPercent: -95 }, { xPercent: -80 }, '<')
        tl.fromTo(mediaContainers[3],{ xPercent: 0, scale: 0.15, transformOrigin: '100% 100% 0px' },{ xPercent: -15, scale: 0.45 },'<')
        tl.fromTo(mediaContainersInner[3],{ scale: 1.85, transformOrigin: '50% 50% 0px' },{ scale: 1.55 },'<')
        tl.fromTo(items[4], { xPercent: 100 }, { xPercent: 95 }, '<')
        tl.fromTo(innerItems[4], { xPercent: -100 }, { xPercent: -95 }, '<')
        tl.fromTo(mediaContainers[4],{ scale: 0, transformOrigin: '100% 100% 0px' },{ scale: 0.15 },'<')
        tl.fromTo(mediaContainersInner[4],{ scale: 2, transformOrigin: '50% 50% 0px' },{ scale: 1.85 },'<')
        
        // --- Phase 3 ---
        tl.addLabel('phase-3', '>')
        tl.fromTo(items[2], { xPercent: 0 }, { xPercent: -100 })
        tl.fromTo(innerItems[2], { xPercent: 0 }, { xPercent: 100 }, '<')
        tl.fromTo(mediaContainers[2],{ xPercent: -60, scale: 1.0, transformOrigin: '100% 100% 0px' },{ xPercent: -150, scale: 0.8 },'<')
        tl.fromTo(mediaContainersInner[2], { scale: 1.0, transformOrigin: '50% 50% 0px' }, { scale: 1.2 }, '<')
        tl.fromTo(items[3], { xPercent: 80 }, { xPercent: 0 }, '<')
        tl.fromTo(innerItems[3], { xPercent: -80 }, { xPercent: 0 }, '<')
        tl.fromTo(mediaContainers[3], { xPercent: -15, scale: 0.45, transformOrigin: '100% 100% 0px' }, { xPercent: -60, scale: 1.0 }, '<')
        tl.fromTo(mediaContainersInner[3], { scale: 1.55, transformOrigin: '50% 50% 0px' }, { scale: 1.0 }, '<')
        tl.fromTo(items[4], { xPercent: 95 }, { xPercent: 80 }, '<')
        tl.fromTo(innerItems[4], { xPercent: -95 }, { xPercent: -80 }, '<')
        tl.fromTo(mediaContainers[4], { xPercent: 0, scale: 0.15, transformOrigin: '100% 100% 0px' }, { xPercent: -15, scale: 0.45 }, '<')
        tl.fromTo(mediaContainersInner[4], { scale: 1.85, transformOrigin: '50% 50% 0px' }, { scale: 1.55 }, '<')
        tl.fromTo(items[5], { xPercent: 100 }, { xPercent: 95 }, '<')
        tl.fromTo(innerItems[5], { xPercent: -100 }, { xPercent: -95 }, '<')
        tl.fromTo(mediaContainers[5], { scale: 0, transformOrigin: '100% 100% 0px' }, { scale: 0.15 }, '<')
        tl.fromTo(mediaContainersInner[5], { scale: 2, transformOrigin: '50% 50% 0px' }, { scale: 1.85 }, '<')
        
        // --- Phase 4 ---
        tl.addLabel('phase-4', '>')
        tl.fromTo(items[3], { xPercent: 0 }, { xPercent: -100 })
        tl.fromTo(innerItems[3], { xPercent: 0 }, { xPercent: 100 }, '<')
        tl.fromTo(mediaContainers[3], { xPercent: -60, scale: 1.0, transformOrigin: '100% 100% 0px' }, { xPercent: -150, scale: 0.8 }, '<')
        tl.fromTo(mediaContainersInner[3], { scale: 1.0, transformOrigin: '50% 50% 0px' }, { scale: 1.2 }, '<')
        tl.fromTo(items[4], { xPercent: 80 }, { xPercent: 0 }, '<')
        tl.fromTo(innerItems[4], { xPercent: -80 }, { xPercent: 0 }, '<')
        tl.fromTo(mediaContainers[4], { xPercent: -15, scale: 0.45, transformOrigin: '100% 100% 0px' }, { xPercent: -60, scale: 1.0 }, '<')
        tl.fromTo(mediaContainersInner[4], { scale: 1.55, transformOrigin: '50% 50% 0px' }, { scale: 1.0 }, '<')
        tl.fromTo(items[5], { xPercent: 95 }, { xPercent: 80 }, '<')
        tl.fromTo(innerItems[5], { xPercent: -95 }, { xPercent: -80 }, '<')
        tl.fromTo(mediaContainers[5], { scale: 0.15, transformOrigin: '100% 100% 0px' }, { scale: 0.6 }, '<')
        tl.fromTo(mediaContainersInner[5], { scale: 1.85, transformOrigin: '50% 50% 0px' }, { scale: 1.55 }, '<')
        
        // --- Phase 5 ---
        tl.addLabel('phase-5', '>')
        tl.fromTo(items[4], { xPercent: 0 }, { xPercent: -100 })
        tl.fromTo(innerItems[4], { xPercent: 0 }, { xPercent: 100 }, '<')
        tl.fromTo(mediaContainers[4], { xPercent: -60, scale: 1.0, transformOrigin: '100% 100% 0px' }, { xPercent: -150, scale: 0.8 }, '<')
        tl.fromTo(mediaContainersInner[4], { scale: 1.0, transformOrigin: '50% 50% 0px' }, { scale: 1.2 }, '<')
        tl.fromTo(items[5], { xPercent: 80 }, { xPercent: 0 }, '<')
        tl.fromTo(innerItems[5], { xPercent: -80 }, { xPercent: 0 }, '<')
        tl.fromTo(mediaContainers[5], { xPercent: 0, scale: 0.6, transformOrigin: '100% 100% 0px' }, { xPercent: -60, scale: 1.0 }, '<')
        tl.fromTo(mediaContainersInner[5], { scale: 1.55, transformOrigin: '50% 50% 0px' }, { scale: 1.0 }, '<')
      }, mainSection.current)
      return () => desktop.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={mainSection} className='MainSection' style={{ backgroundColor: 'var(--section1)' }}>
      <div className='MainSection-wrapper'>
        <div className='MainSection-header'>
          <h2 className='MainSection-headerTitle'>
            {'Some Heading'.split(' ').map((word, i) => (
              <div key={word} className={`header-lines header-lines${i + 1}`}>
                {word.split('').map((char, j) => (
                  <div key={`${char}-${j}`} className='chars-wrapper'>
                    <span className={`chars chars${j + 1}`}>
                      {char}
                    </span>
                  </div>
                ))}

                {/* {i < 'Your Heading'.split(' ').length - 1 && (
                  <div className='chars-wrapper'>
                    <div className='chars'>&nbsp</div>
                  </div>
                )} */}
              </div>
            ))}
          </h2>
        </div>
        <div ref={itemsContainer} className='MainSection-items'>
          <section className='MainSectionItem MainSection-item'>
            <div className='--index-first MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section2)' }} />
                <div className='MainSectionItem-content'>
                  <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>01</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget tellus nulla. Sed sed efficitur dui. Phasellus pretium malesuada felis, vitae rutrum massa venenatis non.`}</p>
                    <p>{`Ut a euismod libero. Etiam laoreet tortor a ligula mollis scelerisque. Integer porta enim quis porta maximus. Mauris accumsan non massa eget bibendum. Mauris et quam et lacus faucibus efficitur.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <video
                        src='/videos/Andreas_Pixabay_313145_tiny.mp4'
                        aria-label='video of green landscape with mist of clouds blowing through the center'
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='MainSectionItem MainSection-item'>
            <div className='--index-between MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section3)' }} />
                <div className='MainSectionItem-content'>
                  <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>02</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Nulla finibus id neque sit amet feugiat. Maecenas rutrum augue non egestas rhoncus. Suspendisse velit dolor, consequat vel tempus ac, vulputate quis nibh.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <img
                        src='/images/annie-spratt-kA8taSQIE7M-unsplash.jpg'
                        alt='image of a landscape; bottom of the image is green grass; center of image is horizon line of a body of water with one single boat with a white flag; top of the image (takes up 2/3 of the composition) is a light blue clear sky'
                        loading='lazy'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='MainSectionItem MainSection-item'>
            <div className='--index-between MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section4)' }} />
                <div className='MainSectionItem-content'>
                <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>03</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Suspendisse porta sagittis pulvinar. Ut at nunc id mauris tincidunt varius sed ac augue. Sed sollicitudin purus ante, quis tincidunt augue auctor id.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <img
                        src='/images/andrew-ridley-CM6GEW9SRuE-unsplash.jpg'
                        alt='image of ocean horizon; the ocean is a teal color and the sky is cloudy and white'
                        loading='lazy'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='MainSectionItem MainSection-item'>
            <div className='--index-between MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section5)' }} />
                <div className='MainSectionItem-content'>
                  <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>04</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Integer auctor justo eget dolor imperdiet aliquet. Etiam vestibulum dui augue, a aliquet metus blandit commodo. Mauris faucibus dui vel ipsum rhoncus, non pretium nibh egestas.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <video
                        src='/videos/Mario-Krimer_Pixabay_306155_medium.mp4'
                        aria-label='video of ocean waves in the foreground moving from left to right during a sunset; the setting sun is visible in the background'
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='MainSectionItem MainSection-item'>
            <div className='--index-between MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section6)' }} />
                <div className='MainSectionItem-content'>
                  <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>05</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean venenatis rhoncus molestie. Donec euismod feugiat massa, non venenatis ligula vehicula nec.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <video
                        src='/videos/Ruvim_Pixabay_325502_tiny.mp4'
                        aria-label='video of a lone car driving through a forest of snow-covered trees'
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='MainSectionItem --bg-terra MainSection-item'>
            <div className='--index-last MainSectionItem-inner'>
              <div className='MainSectionItem-innerSticky'>
                <div className='MainSectionItem-background' style={{ backgroundColor: 'var(--section7)' }} />
                <div className='MainSectionItem-content'>
                  <div className='MainSectionItem-contentTitle'>
                    <span className='MainSectionItem-index'>06</span>
                    <h3></h3>
                  </div>
                  <div className='MainSectionItem-contentText'>
                    <p>{`Aliquam vitae ligula sed felis ullamcorper semper id vitae eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer egestas, metus id vestibulum rutrum, leo enim luctus libero, ac tincidunt ipsum sem in sapien. Vivamus iaculis lobortis volutpat.`}</p>
                  </div>
                </div>
                <div className='MainSectionItem-mediaContainer'>
                  <div className='MainSectionItem-mediaContainerInner'>
                    <div className='MainSectionItem-media'>
                      <video
                        src='/videos/Yakup-Ipek_Pixabay_88207-602915574_tiny.mp4'
                        aria-label='video of timelapse clouds cutting across a mountain; an aircraft zips across the composition'
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className='MainSection-nav'>
          <div className='MainSection-navItem'>
            <span>01</span>
            <p className='MainSection-navItemTitle'>Section One</p>
          </div>
          <div className='MainSection-navItem'>
            <span>02</span>
            <p className='MainSection-navItemTitle'>Section Two</p>
          </div>
          <div className='MainSection-navItem'>
            <span>03</span>
            <p className='MainSection-navItemTitle'>Section Three</p>
          </div>
          <div className='MainSection-navItem'>
            <span>04</span>
            <p className='MainSection-navItemTitle'>Section Four</p>
          </div>
          <div className='MainSection-navItem'>
            <span>05</span>
            <p className='MainSection-navItemTitle'>Section Five</p>
          </div>
          <div className='MainSection-navItem'>
            <span>06</span>
            <p className='MainSection-navItemTitle'>Section Six</p>
          </div>
          <div className='MainSection-navProgress'>
            <span className='MainSection-navProgressBar' />
          </div>
        </div>
      </div>
    </div>
  )
}