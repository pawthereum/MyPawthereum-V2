import strayCat from '../../../assets/images/ranks/strayCat.png'
import kitten from '../../../assets/images/ranks/kitten.png'
import dwarfCat from '../../../assets/images/ranks/dwarfCat.png'
import ragdoll from '../../../assets/images/ranks/ragdoll.png'
import maineCoon from '../../../assets/images/ranks/maineCoon.png'
import abbysinian from '../../../assets/images/ranks/abbysinian.png'
import scottishFold from '../../../assets/images/ranks/scottishFold.png'
import cornishRex from '../../../assets/images/ranks/cornishRex.png'
import persian from '../../../assets/images/ranks/persian.png'
import siamese from '../../../assets/images/ranks/siamese.png'
import himalayan from '../../../assets/images/ranks/himalayan.png'
import blackFooted from '../../../assets/images/ranks/blackFooted.png'
import pallas from '../../../assets/images/ranks/pallas.png'
import iriomote from '../../../assets/images/ranks/iriomote.png'
import sandCat from '../../../assets/images/ranks/sandCat.png'
import desertLynx from '../../../assets/images/ranks/desertLynx.png'
import serval from '../../../assets/images/ranks/serval.png'
import puma from '../../../assets/images/ranks/puma.png'
import leopard from '../../../assets/images/ranks/leopard.png'
import cloudedLeopard from '../../../assets/images/ranks/cloudedLeopard.png'
import cheetah from '../../../assets/images/ranks/cheetah.png'
import jaguar from '../../../assets/images/ranks/jaguar.png'
import snowLeopard from '../../../assets/images/ranks/snowLeopard.png'
import blackPanther from '../../../assets/images/ranks/blackPanther.png'
import tiger from '../../../assets/images/ranks/tiger.png'
import lion from '../../../assets/images/ranks/lion.png'
import sabertooth from '../../../assets/images/ranks/sabertooth.png'
import crown from '../../../assets/images/ranks/crown.png'
import sadCat from '../../../assets/images/ranks/sadCat.png'
import sphynx from '../../../assets/images/ranks/sphynx.png'

export const ranks = [
  { name: 'You are the bottom rank', img: sadCat, threshold: 0 },
  { name: 'Stray Cat', img: strayCat, threshold: 50 },
  { name: 'Kitten', img: kitten, threshold: 100 },
  { name: 'Dwarf Cat', img: dwarfCat, threshold: 200 },
  { name: 'Ragdoll', img: ragdoll, threshold: 300 },
  { name: 'Maine Coon', img: maineCoon, threshold: 500 },
  { name: 'Abbysinian', img: abbysinian, threshold: 750 },
  { name: 'Scottish Fold', img: scottishFold, threshold: 1000 },
  { name: 'Cornish Rex', img: cornishRex, threshold: 2000 },
  { name: 'Persian', img: persian, threshold: 3000 },
  { name: 'Siamese', img: siamese, threshold: 5000 },
  { name: 'Sphynx', img: sphynx, threshold: 7500 },
  { name: 'Himalayan', img: himalayan, threshold: 10000 },
  { name: 'Black-footed', img: blackFooted, threshold: 20000 },
  { name: 'Pallas', img: pallas, threshold: 30000 },
  { name: 'Iriomote', img: iriomote, threshold: 50000 },
  { name: 'Sand Cat', img: sandCat, threshold: 75000 },
  { name: 'Desert Lynx', img: desertLynx, threshold: 100000 },
  { name: 'Serval', img: serval, threshold: 200000 },
  { name: 'Puma', img: puma, threshold: 300000 },
  { name: 'Leopard', img: leopard, threshold: 500000 },
  { name: 'Clouded Leopard', img: cloudedLeopard, threshold: 750000 },
  { name: 'Cheetah', img: cheetah, threshold: 1000000 },
  { name: 'Jaguar', img: jaguar, threshold: 2000000 },
  { name: 'Snow Leopard', img: snowLeopard, threshold: 3000000 },
  { name: 'Black Panther', img: blackPanther, threshold: 5000000 },
  { name: 'Tiger', img: tiger, threshold: 7500000 },
  { name: 'Lion', img: lion, threshold: 10000000 },
  { name: 'Sabertooth', img: sabertooth, threshold: 10000000 },
  { name: 'You achieved the top rank!', img: crown, threshold: 10000000 }
]