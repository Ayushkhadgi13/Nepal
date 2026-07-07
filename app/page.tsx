'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SmoothScroll from '@/components/SmoothScroll';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import ScenicHero from '@/components/ScenicHero';
import AmbientParticles from '@/components/AmbientParticles';
import AltimeterHUD from '@/components/AltimeterHUD';
import JournalSection from '@/components/JournalSection';

import {
  GrasslandsSketch,
  GorgeSketch,
  RidgesSketch,
  PagodaSketch,
  PineSketch,
  MountainSketch,
  GearSketch,
  SummitGoldStamp
} from '@/components/Sketches';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const [stage, setStage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage < 1) return;

    const updateMouseCoords = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(document.documentElement, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', updateMouseCoords, { passive: true });
    return () => window.removeEventListener('mousemove', updateMouseCoords);
  }, [stage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (stage < 3) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [stage]);

  useEffect(() => {
    if (stage >= 1) {
      const timer = setTimeout(() => setMounted(true), 20);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useGSAP(() => {
    if (stage < 3) return;

    const transitionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    transitionTimeline.to('html', {
      '--paper-bg': '#EDDEC2',
      '--paper-surface': '#E0CEA8',
      '--primary-ink': '#362417',
      '--secondary-ink': '#694F3A',
      '--vignette-color': 'rgba(54, 36, 23, 0.28)',
      '--spotlight-color': 'rgba(219, 178, 107, 0.10)',
      '--fiber-opacity': '0.12',
      '--stain-opacity': '0.05',
      duration: 0.25,
      ease: 'none'
    }).to('html', {
      '--paper-bg': '#E4E5DC',
      '--paper-surface': '#D6D8CC',
      '--primary-ink': '#232A24',
      '--secondary-ink': '#4F5850',
      '--vignette-color': 'rgba(35, 42, 36, 0.22)',
      '--spotlight-color': 'rgba(255, 255, 255, 0.06)',
      '--fiber-opacity': '0.10',
      '--stain-opacity': '0.03',
      duration: 0.25,
      ease: 'none'
    }).to('html', {
      '--paper-bg': '#D6DEE3',
      '--paper-surface': '#C2CCD4',
      '--primary-ink': '#131A1E',
      '--secondary-ink': '#37424A',
      '--vignette-color': 'rgba(19, 26, 30, 0.32)',
      '--spotlight-color': 'rgba(200, 222, 235, 0.08)',
      '--fiber-opacity': '0.08',
      '--stain-opacity': '0.015',
      '--frost-opacity': '0.45',
      '--frost-color': 'rgba(235, 243, 246, 0.65)',
      duration: 0.25,
      ease: 'none'
    }).to('html', {
      '--paper-bg': '#EBF2F5',
      '--paper-surface': '#DFE7EC',
      '--primary-ink': '#0C1114',
      '--secondary-ink': '#2D373D',
      '--vignette-color': 'rgba(12, 17, 20, 0.12)',
      '--spotlight-color': 'rgba(255, 255, 255, 0.12)',
      '--fiber-opacity': '0.04',
      '--stain-opacity': '0.0',
      '--frost-opacity': '0.10',
      '--frost-color': 'rgba(255, 255, 255, 0.2)',
      duration: 0.25,
      ease: 'none'
    });

  }, [stage]);

  const structureData = {
    terai: [
      {
        id: "chitwan",
        title: "Chitwan National Park",
        diaryText: "Deep in the warm lowlands of the outer plains, the dense subtropical jungles of Chitwan hide the raw weight of ancient fauna. Tall elephant grass bends under afternoon humidity, parting to reveal wetlands where rhinos move with heavy patience along the river banks.",
        marginalia: "Air temp: 34°C. Soft pollen particles drift along the Narayani. The damp Lokta fibers absorb ink with high dispersion.",
        fieldNotes: "Rhinoceros unicornis — tracking data near 27.5°N",
        inkPlateLabel: "Chitwan Forest Silhouette",
        svgSketchPath: <GrasslandsSketch />
      },
      {
        id: "lumbini",
        title: "Lumbini Sacred Garden",
        diaryText: "A sanctuary of profound silence. Here, ancient brick ruins, structural pillars, and fluttering prayer flags mark the historic birth grounds of Gautama Buddha. The air is warm and static, carrying the scent of wild mustard fields and oil lamps.",
        marginalia: "Ashoka Pillar inscription examined. Coordinates: 27.47°N 83.27°E. Ink notes dried instantly in the dry plain breeze.",
        fieldNotes: "Mauryan brickwork strata analysis",
        inkPlateLabel: "Sacred Ashoka Grid Analysis",
        svgSketchPath: <GrasslandsSketch />
      },
      {
        id: "koshi-tappu",
        title: "Koshi Tappu Wetlands",
        diaryText: "Where the broad Koshi River fragments into vast muddy wetlands. The early morning fog hangs low over marshes and alluvial grasslands. The field notes record rare migratory birds and the heavy, curved horns of wild water buffaloes.",
        marginalia: "Bubalus arnee observed near the sandbars. Dense river mist made pencil sketches preferable to ink testing.",
        fieldNotes: "Waterfowl migration patterns (Record VI)",
        inkPlateLabel: "Alluvial Grassland Detail",
        svgSketchPath: <GrasslandsSketch />
      },
      {
        id: "bardiya",
        title: "Bardiya Wild Woods",
        diaryText: "An isolated, untouched dry forest in the far west. Walking along the dry river beds of the Karnali, the silence is broken only by the alarm calls of deer. Tracks in the clay suggest the royal Bengal tiger passed through just before sunrise.",
        marginalia: "Panthera tigris tracks measured at 13cm width. Clay composition turns to a rich ochre-yellow.",
        fieldNotes: "Karnali Basin track matrix V",
        inkPlateLabel: "Sal Tree Silhouette",
        svgSketchPath: <GrasslandsSketch />
      }
    ],
    midHills: [
      {
        id: "pokhara",
        title: "Pokhara Middle Basin",
        diaryText: "The gateway to the high passes. Pinned between the quiet waters of Phewa Lake and the sheer wall of the Annapurna massif, the air cools rapidly at dusk. The reflection of Machapuchare sits sharp on the windless lake surface.",
        marginalia: "Elev: 820m. Air pressure settling. The Lokta paper takes the ink with finer definition as dampness recedes.",
        fieldNotes: "Machapuchare: ~6,993m profile projection",
        inkPlateLabel: "Lake Mirror Reflection Plate",
        svgSketchPath: <GorgeSketch />
      },
      {
        id: "bandipur",
        title: "Bandipur Newar Outpost",
        diaryText: "A mountain ridge settlement built along ancient trading paths. Red-brick facades and hand-carved wooden balconies frame narrow stone lanes. From the ridge, the valley slopes down into waves of green terraced farmland.",
        marginalia: "18th-century Newari architecture intact. Gilded window lattices casting sharp late afternoon shadows.",
        fieldNotes: "Ridge settlement facade elevation",
        inkPlateLabel: "Traditional Facade Framing Study",
        svgSketchPath: <RidgesSketch />
      },
      {
        id: "gorkha",
        title: "Gorkha Ridge Palace",
        diaryText: "A fortified palace standing high on a sandstone ridge. Looking out from the brick walls, you can see the northern peaks rise over the foothills. The stone staircases leading up have been worn smooth by centuries of footsteps.",
        marginalia: "Royal court brickwork dating back to the Shah line. Elevation wind speeds reaching 18 knots.",
        fieldNotes: "Hilltop masonry consolidation index",
        inkPlateLabel: "Fortress Rampart Elevation Sketch",
        svgSketchPath: <GorgeSketch />
      },
      {
        id: "dhulikhel",
        title: "Dhulikhel Eastern Gap",
        diaryText: "Looking out from the eastern rim of the valley. The sunrise outlines the long Himalayan horizon, from Cho Oyu in the east to Langtang in the west. Below, the terraced slopes are slowly painted in shades of gold and amber.",
        marginalia: "Temps: 14°C at dawn. Clear skies with thin high-altitude cirrus clouds. Paper fibers are dry and firm.",
        fieldNotes: "Mountain horizon compass azimuth alignment",
        inkPlateLabel: "Foothill Terrace Contour Grid",
        svgSketchPath: <RidgesSketch />
      }
    ],
    kathmandu: [
      {
        id: "kathmandu-durbar",
        title: "Kathmandu Durbar Square",
        diaryText: "The historic heart of the old city. Multi-tiered pagodas of red clay brick and dark timber stand over stone courtyards. The heavy scent of temple incense, pressed mustard oil, and ancient timber fills the air.",
        marginalia: "Elev: 1400m. Complex Newar architectural structures. The journal ink holds fine detail without spreading.",
        fieldNotes: "Majestic pagoda roof brackets structure",
        inkPlateLabel: "Durbar Square Courtyard Geometry",
        svgSketchPath: <PagodaSketch />
      },
      {
        id: "patan-durbar",
        title: "Patan Stone Courts",
        diaryText: "A courtyard of master metalworkers. Patan's squares are a testament to refined stone carving and copper work. The golden facades of the shrines reflect the warm light, casting a subtle metallic glow onto the worn flagstones.",
        marginalia: "Siddhinarasimha Malla brickwork. Fine metalwork details recorded under low sunlight.",
        fieldNotes: "Chiri stone temple architectural grid",
        inkPlateLabel: "Krishna Mandir Stone Carving Plan",
        svgSketchPath: <PagodaSketch />
      },
      {
        id: "bhaktapur-durbar",
        title: "Bhaktapur Malla Palace",
        diaryText: "A preserved medieval city. The Golden Gate stands as a masterpiece of gilded brass, catching the morning light. The quiet brick lanes are lined with potters drying their clay vessels in the sun.",
        marginalia: "Fifty-Five Window Palace timber carvings. Ochre wash on brickwork creates a warm golden backdrop.",
        fieldNotes: "Malla royal court structural framing",
        inkPlateLabel: "Gilded Door Frame Detail",
        svgSketchPath: <PagodaSketch />
      },
      {
        id: "swayambhunath",
        title: "Swayambhunath Stupa",
        diaryText: "A stone stupa standing on a hill over the valley floor. Worn stone stairs are climbed alongside monkeys. From the dome, the painted eyes look out across the valley, tracking the afternoon mist as it rolls over the hills.",
        marginalia: "365 stone steps leading to the summit. Golden spire reflecting early afternoon light.",
        fieldNotes: "Hemisphere dome structural geometry",
        inkPlateLabel: "Harmika Eye Elevation Analysis",
        svgSketchPath: <PagodaSketch />
      },
      {
        id: "boudhanath",
        title: "Boudhanath Tibetan Mandala",
        diaryText: "A massive white dome resting on a mandala-shaped platform. Pilgrims walk in a clockwise circle, the hum of their prayers punctuated by the spinning of brass prayer wheels and the snapping of prayer flags.",
        marginalia: "Mandala platform layout measured from above. Air carries a rich scent of Tibetan butter lamps.",
        fieldNotes: "Symmetrical mandala base plan V",
        inkPlateLabel: "Concentric Stupa Terrace Layout",
        svgSketchPath: <PagodaSketch />
      },
      {
        id: "pashupatinath",
        title: "Pashupatinath Bagmati Banks",
        diaryText: "A sacred Hindu temple lining the shores of the Bagmati River. Stone terraces lead down to the water, where morning fires drift smoke upward. The temples, steps, and shrines are weathered by centuries of devotion.",
        marginalia: "Stone steps worn down by river flows. Air is heavy with woodsmoke and incense.",
        fieldNotes: "Bagmati riverside temple elevations",
        inkPlateLabel: "Stone Shikhara Shrine Profile",
        svgSketchPath: <PagodaSketch />
      }
    ],
    highHimalayas: [
      {
        id: "annapurna-massif",
        title: "Annapurna Sanctuary",
        diaryText: "A high-altitude basin surrounded by a ring of peaks. Glaciers descend from the heights, carving deep channels into the valley floor. The wind whistles through fields of rock, and the air grows thin and cold.",
        marginalia: "Elev: 4130m. Ice crystals forming on the margins. Ink is drying slowly in the sub-zero temperatures.",
        fieldNotes: "Glacier crevasse movement tracking",
        inkPlateLabel: "Mountain Ridge Silhouette",
        svgSketchPath: <MountainSketch />
      },
      {
        id: "langtang-valley",
        title: "Langtang Glacial Valley",
        diaryText: "Walking through a valley carved by ice. Stone walls line paths used by yaks, winding between simple stone villages. Above, the peaks of Langtang Lirung rise like white monoliths into the cold, clear blue skies.",
        marginalia: "Glacial moraine stone composition. Air temp: -4°C. The ink has turned a deep, cool charcoal black.",
        fieldNotes: "U-shaped valley glacier profile",
        inkPlateLabel: "Langtang Lirung Face Plan",
        svgSketchPath: <MountainSketch />
      },
      {
        id: "manaslu-circuit",
        title: "Manaslu High Pass",
        diaryText: "Crossing the Larkya La pass. The wind whips across the ridge, carrying fine snow that stings the face. Below, the trail winds down through fields of boulders toward the valley below.",
        marginalia: "Pass height: 5106m. Oxygen levels are low. Hand-written notes are slightly shaky due to the cold.",
        fieldNotes: "High pass slope contour gradient",
        inkPlateLabel: "Larkya Pass Cairn Silhouette",
        svgSketchPath: <MountainSketch />
      },
      {
        id: "everest-base",
        title: "Khumbu Base Camp",
        diaryText: "A city of yellow domes resting on shifting ice. Prayer flags whip violently in the freezing air under the shadow of the steep Khumbu Icefall, where the glacier breaks apart as it moves.",
        marginalia: "Base height: 5364m. Water boils at 82°C. Snow drifts across the page, smudging the ink.",
        fieldNotes: "12-point crampon structure & safety gear",
        inkPlateLabel: "Ascent Equipment Outline Detail",
        svgSketchPath: <GearSketch />
      }
    ]
  };

  return (
    <SmoothScroll active={stage === 3}>
      <div 
        ref={pageRef}
        className="relative min-h-screen bg-[#F3EAD3] overflow-hidden selection:bg-[#B38A3A]/20 selection:text-[#2C1E14]"
      >
        {stage === 0 && (
          <IntroScreen onComplete={() => setStage(1)} />
        )}

        {stage >= 1 && (
          <>
            <AmbientParticles />
            
            <AltimeterHUD />

            <div
              className={`lokta-paper-main min-h-screen transition-opacity duration-1000 ease-in-out relative z-10 ${
                mounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="page-wear-fold top-[33%]" />
              <div className="page-wear-fold top-[66%]" />

              <Navbar 
                triggerDraw={stage >= 1} 
                onComplete={() => {
                  if (stage === 1) {
                    setStage(2);
                  }
                }} 
              />

              <main id="chronicle" className="relative z-10">
                
                {stage >= 2 && (
                  <ScenicHero 
                    triggerMapDraw={stage >= 2} 
                    onComplete={() => {
                      if (stage === 2) {
                        setStage(3);
                      }
                    }}
                  />
                )}

                {stage >= 3 && (
                  <div id="ascent" className="relative">
                    
                    <JournalSection
                      altitude="60m"
                      region="The Terai Belt"
                      chapterTitle="Humid Horizons & Tall Grasslands"
                      locations={structureData.terai}
                      bgGradient="bg-gradient-to-b from-[#FAF3DE]/0 to-[#F5E6BF]/20"
                    />

                    <JournalSection
                      altitude="1400m"
                      region="Middle Valleys"
                      chapterTitle="Living Terraces & Stone Staircases"
                      locations={structureData.midHills}
                      bgGradient="bg-gradient-to-b from-[#EADBB8]/20 to-[#E3D4B1]/25"
                    />

                    <JournalSection
                      altitude="2000m"
                      region="Kathmandu Bowl"
                      chapterTitle="The City of Gilded Pagodas"
                      locations={structureData.kathmandu}
                      bgGradient="bg-gradient-to-b from-[#E3D4B1]/25 to-[#DDD0AE]/20"
                    />

                    <JournalSection
                      altitude="3000m"
                      region="The Highland Forests"
                      chapterTitle="Rhododendrons & Passing Clouds"
                      locations={structureData.highHimalayas.slice(1, 2)}
                      bgGradient="bg-gradient-to-b from-[#DDD0AE]/20 to-[#D4CBB4]/25"
                    />

                    <JournalSection
                      altitude="4500m"
                      region="Alpine Ridge"
                      chapterTitle="Granite Ridges & Cold Winds"
                      locations={structureData.highHimalayas.slice(0, 1)}
                      bgGradient="bg-gradient-to-b from-[#D4CBB4]/25 to-[#C9C3BA]/30"
                    />

                    <JournalSection
                      altitude="5364m"
                      region="Khumbu Glacier"
                      chapterTitle="A City of Tents on Shifting Ice"
                      locations={structureData.highHimalayas.slice(3, 4)}
                      bgGradient="bg-gradient-to-b from-[#C9C3BA]/30 to-[#BFC0BC]/40"
                    />

                    <JournalSection
                      altitude="8848m"
                      region="The Summit"
                      chapterTitle="The Silence of the Summit"
                      locations={[
                        {
                          id: "summit",
                          title: "The Silence of the Summit",
                          diaryText: "The wind quiets down. The horizon curves under a dark indigo sky. Below you, the peaks of the Himalayas lie like frozen ocean waves. There is nowhere higher. Only thin air, absolute quiet, and the endless view.",
                          marginalia: "8,848 meters. The journey is complete. The ink is dry, frozen, and permanent.",
                          fieldNotes: "90° East perspective view",
                          inkPlateLabel: "Summit Achievement Stamp",
                          svgSketchPath: <SummitGoldStamp />
                        }
                      ]}
                      bgGradient="bg-gradient-to-b from-[#BFC0BC]/40 to-[#EBF2F5]"
                    />

                  </div>
                )}
              </main>

              {stage >= 2 && (
                <footer className="py-20 px-6 border-t border-[var(--primary-ink)]/10 text-center relative z-20 bg-[var(--primary-ink)]/2">
                  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.3em] text-[var(--secondary-ink)] font-medium font-serif">
                      © {new Date().getFullYear()} The Living Journal of Nepal. All Rights Reserved.
                    </span>
                    <div className="flex gap-8">
                      <a href="#" className="text-[10px] uppercase tracking-wider text-[var(--primary-ink)]/80 hover:text-[#B38A3A] transition-colors font-serif font-bold">
                        Archival Records
                      </a>
                      <a href="#" className="text-[10px] uppercase tracking-wider text-[var(--primary-ink)]/80 hover:text-[#B38A3A] transition-colors font-serif font-bold">
                        Field Maps
                      </a>
                    </div>
                  </div>
                </footer>
              )}
            </div>
          </>
        )}
      </div>
    </SmoothScroll>
  );
}