import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, FlatList, Button, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from './Firebase';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat';
import * as Location from 'expo-location';
const Locations = () => {

  const navigation=useNavigation();
  const mapRef = useRef(null)

  const [markerShown, setMarkerShown] = useState(false)
  const screen = Dimensions.get('window')
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [MechanicList, setMechanicList] = useState('');

  const route = useRoute();
  const data = route.params.data ? route.params.data : null; 
  const showDetails = (marker) => {

    setMechanicList(marker)

    setMarkerShown((prevMarkerShown) => {

      return true;                  // Return the new state value
    });
    console.log(marker)
  }

  const cancel = () => {
    setMarkerShown(false)
  }

async  function SendReq  (item )  {
    const email = firebase.auth().currentUser.email;
    console.log("Email", email)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
console.log("Item",item)
const ID_Number=item.ID_Number;
const Speciality=item.Specialty;
    if (item) {
      await db.collection('RequestService').add({
        Latitude: latitude,
        Longitude: longitude,
        email: email,
        ID_Number: ID_Number,
        Speciality: Speciality,
        Status: 'Pending',
      }).then(() => {
        setMarkerShown(false)
        util.successMsg("Request Successfully Sent");
       
      })
        .catch((error) => {
          console.error('Error updating Req:', error.message);
        });
    }
    navigation.goBack();
  }
  const UserLocation = {
    latitude: 24.8787702,
    longitude: 66.8788,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={UserLocation}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true} >
        {data &&
          data.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Latitude,
                longitude: marker.Longitude,
              }}
              title={marker.Name}
              description={`Specialty: ${marker.Specialty}`}

              onPress={() => {
                showDetails(marker);
                // Implement your logic to show details here
              }}
            />
          ))}
      </MapView>
      {markerShown && (

        <View style={{
          ...styles.flatListView,
        }}>
          <FlatList
            data={[MechanicList]}
            contentContainerStyle={{
              paddingBottom: 40,
            }}

            renderItem={({ item, index }) => {
              return (
                <View style={{
                  ...styles.tabViewStyle,
                }}>

                  {/* Time and Distance */}
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Image
                      source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAswMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAQIHAAj/xABCEAACAQMCAwUGAwUHAgcBAAABAgMABBEFIQYSMRNBUWFxBxQiMoGRQqGxFSMzwdEWUmJygpLhQ/A0U1Vzg6LxJP/EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAA1EQACAgEDAwIEBAQGAwAAAAAAAQIRAwQSITFBUQUTIjJhcRSBkaEjQrHBM0NTctHxBjRS/9oADAMBAAIRAxEAPwC7DiBpRg2kSq3Xl6itO2jPuDrd7e+T+C5HiybfeojAdQ0qBSzxHs/IdDRYUKHjwxH92mImt0AXnYd3U+FACS3ha4vJJ5G5sNsfGkSQ15RigDUjB260AzU70xWeAoCxNrOuWunyKgxLODkRoe/zNR3JE1BsTJxjdRnPuUQU+LH/AIqDmyexDDTuNbSYhL2LsDt8anmX6+FCn5E8fgskM8c8YlhkV0PRlORViafQr6dTfNMRpIAykUALtPLWupCNfkfuNAhvcryPzf3utMCLI8aYiFsc+1Azzk8hxQBvoyaHLaXD36SCcO2SrEc23lQ07EqLfwrZxnQLQr0KkjPgWNUz+YnHoUrSueNH7cHCyscHvFXsrLCeJrW0EccwZVYHBTYACqpOjRixymrQDqWsJOzCNiygkZHWpIpladDDT4NPvrVXkm7MgbhjSY0Caj2ALW9rICMYzmmgBYtPktok/dtgjYgUgJEsrh/kicn0osdEd7pmrBFe0t1PKcuHO5HgKAJLHT7m9gE0aqBnBBbcHwpiK/x3fTcN2kKKVFxd8wRhvyqMZP5iq5yoshHk5qkd1cElkdA3Q7jPntVW5F2xhEWh30seViVVALcwB3+9LciXtsCvbLULSZS/MwYZCkbClaD22O+DdeexvvcZtobg8qqTssnd6Z76shIqyROi6c11Pb881uyOGZXA3xirygmb4fmyPUUCB5bR5OWZFIKuCDTAYSfvIfEigAIHuoAww3oAw/yUxMTJcNHEYQoIkLkk9RUhdi9aQHj0y3VZSoCdAaqfUmk6NouGhLbqyXgbnQHp5VJy5Eo2hdecNX/I0Sxgs+B1BGKi2mNbo9GCf2dv7dEijt5CxYlmJBzTE7Y1s+H7lYQJJI1Pgc7UNgkeThOMXpu2uJO0Ixhc4pEqH8AW3hEbuGAGxdt6QGr3NuvzXK/SnQWQnUbQbczv6LRTAXTO6XHb6PbySTOf3kJIVXH8jTb8irwUviWL9s8aWyahaNB2EA/cu4bG5O2NvCsueRs00LfJatNtIez5REg8sVnXJ0JJIYQ6TbLkmJcHqANqsUSly5MT2Fryb28TY6ZQVF8Elycw400O3i1uCe2hCsxV/hGMMDUoMozRoukOu3WlXUsV5Yg27sXSQPsD3itzo54ytOJdFvQnPJErydFYYNKhWMr+x96jAtWSNcf3cg0rodWJbDh28tbt3eftonPQHHL96dioYy8OxludZmAPUU7CjKcP22N5GJ9aVhRtNocYiIgTLY6k00xNFb1XQrq1tDM0CrGhALZ3GTU0yLVCr9sXKfCspAXYAVFokmMYI+eMMJJVYErlJWXp6GptclaCJtQubaCF/fJV+PlBL5PSo1yTtnodfuzdGAX5Ljcx5GRRSHbGA1a+I3uP/qKW0LI5NQnIzLcNjzaikFgM2r2MI/fXSffNAAknFOlpsJGfyRKLQ6ITxdbHaGzuH/0UtyCjH9q7gkdlpVyPPBFFoKAbWea54muL29iMJECEBm6DzrFmakzpaaO3qXPTtR0xjhb2Bn8A4quKovlKxwLq3VC5dQgGc5q20V7WCz3lrIpEVxF0z84qEiceGULjSOdrmzli5mMsgjCgZ36g1HG+eSOeLl0DpeKNOSV7e6Do6EqwZMjNdKLTRyZpxlRsmqaNcDKywcxGNxipcEbZNpmotbz+7w3RMTfFEQ2ceIoaQWPY9Zu06lX9VqO0e4lOvXGP4MX2pbUG4H/tFdM5AjhGPAU9objE2vagyYhaGM+JjzRtQtzFOp6lqE0IhvboSR7vgIF6DyqUYpCbbKd2ud/GgZbtPP7qUSdQ9OiJm+7P3aMHHzE71FLkfYQe8aZBqD3cETT3rDlIjGTR8K5Jchjz61crlY4bCI/imcZ+1RchqIquTpiknUNcmunHVYOn5VG/I6I1v9Ch/gaU8x7jM9LcMN07XYXmKixsbWMD5inMfzosjLjoGT6zzWz+7X8UcgBwBCopNiUmScKalc3bySX96H7kjIUfoKLYSdMeS2sU+oSh1Dc8IDH6msc1ydfC08cb8Af9j7VmMtwznlzjfb7UdqaJOPN2NY9MhudHNlkhQ2A5NFJom7QuHA0KzAxOyxk7jAYfmD+tNrsitVdsPu7KCOS1hCKxibKhuh2wf1pJE1zJFN1HVT+0LpHsbWaOORlGU3wDjrWuEqicrNzkYGZ9GuP4+mqp8YnIqSkiumRSWmmAdraXF1byqCV5skVNNCYxsRrSwJNZ3UN3HjdGYBh5VJNkaChrrQ/BqNtLbN4kZX707QUyLTYIo2uJIbuSaOdsnLdPSkog3Y8gI5QBnAHeadERXrtwYhP4LEB96OwIq4kqJIsN/rP7OuexS3aVjEhxncPjcVLdQUR6o0H7NspdauCjO0h7CA/PuO+oNskqEdxr14sRg0Wziso+gkXDSH6mlbHSEN/BqN47STe8SbdDLvS5BC+O1v4mASGTb+9g0cjsJ5NSXdbd8+RpUx8EsdzqK/PZSGnQuCYXV2Fz7k/pilQGY7+YYdbWeNh0IHSjaLguvDXEc9/cD3mMxyRxquW/Fgnf86zZo7eToabJa2lo1LU5FUxqjPIoyFzjmI7qqTs1bqBI+IrmKCNBpEhJf4u8CpWN31ob2epvztEC+QnPyuuCtLdRHhiTiPiBtKEV12BuJASAinHUY6+VSxpyZVlmoKzla6lqgDYVyXJLZHXNa6OY+XbNU1K+U4e25vpilQBkGuSRDEts4U9dqdCaCLLW4uaQL2i53XG2DToKG8fE2ERZUMy9Csgzmi2LaZjudLu5ea2eTTpz0/uE00wcRgmpXOnME1OPmjPSeLofWrN3khtAOJdSEuiveQbhrgRnPgBSlLgcUU831yTnNVWy2kHa7fXU0enXUcbq86HnyM9MAfzqyTfBCK8hmstPa6VopaGOZ/dncqzY3Lf8UmwS5Ey304P/AIOHy5ZKW5kqRPFqVx32QPo1PcxbUTftOb/0pz5g0bmG1HjqdyPl0uUfWjcxbUY/aN93abLRuYbTHv8AqB62DqfM0bmG08bzUiPhs1/30b2NRQRYXuoQXiPcWpSIA8zgggA1VluSLcT2yOkaZPbaza+7u0ZuoeV4pNifWsqR0YzV8jMWUk6iGSKI+Lci5+lTpUTuCBdV900m0FnZIsbFNwBjPj9araK3K2c14r1aaR7fkTmiaYxr8XQ7Zx49RWrTR5Zj1L+ERvd3wkKpYzSKDsyZIIq+VxdMypJq0FxPfvEC1k6hugJ3osKIue77QoLWTeix0bhLxhlYGGPMUBRFLcyjINq7hRuc99KwoG9755QXtJlBIyBnGaQw6PV720t3jZZDCT8rbim3RGiwaZf2s1hbWN0oki1EEvzbcvdkeYNSfQj3ALngzVUndbTspYAfgcnBIqBPcXGfhTS7S2R47aS6fl+Np7gqo9KYhbq+oWEd1aQrpdvN2dsqqWBYJuTj86VjRBJcQ3A5Bp1mvkI6aVibI1sbZzltLhb/AC5FFMLROtloqHFzarCe4EsKAJGtOGx+ONf/AJGFLgfJqbPh1vkaDP8A7rUACe42l7OU0rS1uRH88iynlB8MnvoGYXQr3DCTTFkXOw7YDFAEF9o0sNjcy/sgRckTMX94zy4HXHfTSvgTFNjqtzbTJcWUpLFf3kee/vHpWaUHF8o1xmnTix8nHV7EzAx/hwN8ctRos3MCN9f6zMZJpiFIwznYAeX9aVX0Qm/JDxFe6eUsrKzZJFteYl03y7dceNb9FicW5SMeuzRlFQgBac6tKPe5XWNtsK2Atbc2Jzjfc5+LKoyrsPItP0s4kW9x63FYXFrqa1O+h5rHTckm9X1E9RJg8lvpybJ20pPektIAD3W294ZUt5TlgQHk+9CAb+5aEFHbWV0rEfNHMdqYjMGh6ZfgizutQ8OUqr/yo6hyjfUuEb6GKBra8jnjQ/Cpj5WQHrTEGwX2o20KwychZBglgc06EWe6hGr2pWOfsY+4+NRsnVdQzR+GdNgt+XUIYrpsfOTuaBCbiLh6wVw2l9jasOrNk1KDpkJq1SZVRNfx3jW3bwYPSVdlH3qz3E+iK/aknzKzSQlx2lxdLI3Q4br6VBlqB5g7RMqs7BlwuCNqrJmbTT3uJxDJPIoKk0be4bh1Hf6XpWnxxveujhfijjbJz6CrI45S6EXOK6iS+4xmPMLBZEQfjkfJ+w/rVy067lTzPoit395d6g/a3k8krEDAY7D0FWe2l0K/cfcEUNkBSwcHbeq5QTVdy2ORx+wY1zeOclwMDFRWkQ/xTIWeQr++ncp4I3WrFjjEg8spdCS25SQUQ+AFaIJXwjPkuuWEuSq9d/WruiM65Znmw2MZwMnNQlGL6osjKSVphUFwyAfBGfJlqqWmg+hbHUy7l30PTJ9R0h71YIrC1VCxnuXwpHiveR4bVjmowdGmLlPkrmnCM30paYFuchObbI8arstouUfBnNb9rPdssjbgCX4R+VR3WPbQsfQmglSS2nZXjbc5zmgGWK3vI5lS2vCO1b4VOeppkUC3VlEbh+efDZ3y4osA5NMh7JCytHynZEbIFS6dBtuXVjK1laReWOJmwcZIxRZGhPr0N2YpJUty2B0Xc1LchUyt3GnLDo1xPcKQxU7EY+lQQ2LYruytdOg5dGjnA5UeWQEAnHdimxLkf6Pp2gaxaNNFGIGjx2i9pjkJoSTG21wKbqLRJbyTTrO7uEkK/DdRNzBT3gDv2xnH0NWvG4fEVrIpcIqGr6XcaVe+7zFGDLzRyJ8si9xFacclPoUTjt6gTrgBfE71Y0QUr5M8uO7agDJi5scpw3jScL6DU9r5Pe6bZkYk/ahYfLD3/CN0tlHzKR9c1KONIhLK2SqAGwBuf0q2kitttHn+YetJiiYjGRzt+LrSSJS44Ru78qc3605OkRgvi5O58T6LLxJwhbW+mOIXjCSLEx5VOB8h++3oK5GOSjO5HVnFuNIpj8GHSuHtQ1XXokS6jhMdrAhz+8PRtuviB61Ge3d8PQlG65C9GF9fW0JS1mL8uDzKQPzoY7Go0ud/480cWO4b4oFZ6Th6CZRyajyyqwdSiB+noaAKfrUmkNqtyblrwzc+HIIXJ9DUqRG2Xu64aitp0a0ZoA245JGAz3j/AL8aSlY3ExFpXEKFnjMUqAnCTpgn0I/pT3REkzy6rJa3a2mo20llM/y8xyjn/CaXHYYxa5tSAt3HHh9sNjf6GgDYaZpV2nZLZxlc5KhcCiwSKbxpo9jw3cRXdvM8NvL2cTWyn4Gck5ZvQY+9QjNvIoL6t/YtWNe25S/IqkuhFNUhubaVRCG53jcEFD4DuIrX7rcdrMmxKW5FkteHo+JXitbgsOyLOrKwBHMBkb+grFnz5sNeyrb8mvBhxZYt5eiIb/2Vzo3NaXjcvcssefzX+lVR9X1EH/GwP8mSfp2CarHk/U0tfZddSwyNcXWGA+Ds02z9etKXrGpyc4tO6+rr9Aj6dgx8ZMvP0EPEHCU/D0MT3N0kvanCp2ZUnYknv2/rW/Qa+epk4SxOLXkya7SwwRUozUrEaxjOQNq6yRzGy0aHwVd6xpq6hFcLGruyKrQls4OM7GuNr/VnpMntxxOf2OnpPT1nxqTmkGw+za/aVwbyHKjbETbnz8PzrNH19v8AyJfU0S9JVf4qApuANZW4EZa1xn5u0P6YzUp/+RaVfyyvxRXH0fNfzKvIp4j0G74fuYbe5Kv2kYcOgOBuRjcddq6Gi18NXFuKars+pm1Wklp6t3ZHw5pUuu61b6dD/wBVx2hx8iZyx+354rTlmowZRig3JHe9avbbSLZZo4ZpJ3Ajgt7f5piBsPDA8T0rjynGPMnR1IxcuiKLxJqfGUMf7avorS3tLRGYWnMH5u8knHXG2alPLiwyjBptydBDFPMpSTS2/uMNG4ri1exhubOC4kmcfFbQj+Gw2IZjtU2isJYazPIQlnBabZPaHnf18KLQU2eh0e+un5JtQnfLcuI25AM+OKW4Now/sBpLby2/aOfmdtyTUd6JbWWJWSOcxSqoWNucNy5wP+9vrUa44JN8kdtMl3Ol5BdYiUsvKcfHTfCpkbt2gDieG11mw93cEuT8G26OPOiNolKmiu8MXUUEnumsK02xCSMMlWBxg/8AfdV8ourRSpc8j9Uu7aZ5baH93jqxHSqm1XJYk74Kj7U3sbjhw+9Tqtw7q0a97Hvx9Kz6eUsuXHkivNr6M0ZYqGLJF/SvujmulcQz27x298A8a/D2oG49fEV1JYmjnKakdB4f1hNIW4u35ikUYlblXmJQ7ZH5Vh1MMzivZrd9Tbp5YuVlfA9i9pGiyJk3GMeMbj+VZXH1OPXCn9mT3aN8rJX5ED+0XRIWOJzvn5YXPXzxRs9UlysSX5j3aGPHufsUbj/iO1166sDZSBo4I3B2IwWI7j5Cup6bLUOMlnhtd/qYNcsKr2pWisFuh6V1X0OZ1Z2DhPWtO03h/TreSaIPFBzsO1X5mOTXlNV6nKOecVhk6fg9Fg0Ufai96QytOKdLBP8A/ZbszsST2q1W/UM/V6eSRZ+Ex/6qsLk1qwk5Qs6YyP8AqL/WkvVca/ypX9gegm18yr7iXi3RrPiOyaeSQKkStyTA7pgbnwx4jyqH4jVrItVpo2uji+vDvj9Sfs4XH2Mz56pkHsl4aXTLGbVZyjS3RxA42AhH4v8AUcn0xXbzZvcrijmwxbG0nZNomrLxLxTqN3E3Na2ZS3tz3bElm+pA+wrla/HeXBCXm2dDTTrFkaCvaI3LwpfhvxRch365IFXZIuetwR+7KIPbp8khN7GeXT+HplcM5ur12j5V2TAVdz3DbNb88KkZcUltRf7S1vRJJ7xcI7suygfDg1S5LpRYovqSaZYdnGuVKlWOQTsx8ajKXgcYm0r3yyEcsf8AuqSUWhSbTF+vwS3qvHA7xvhTzKSM7g/y/OnjpcsU+UQ6Os9hA1ulnDJ2aqoPa4HLv1261ZNKXcrhceKG0cPLZM7qrOW5iuc8pI6A1Q3cqL4qo8nPOLIpLPV7hbZ2ilmhFzCygHDDrt9PzrRF3EpkqkZ4R4vu+IW92kiVcLiWUDGR6Vj1ElGKT7v/AL/Y1YE22/CKb7VNQXUtbW1hj5EsRyjfdiQCT+QrZoMcZRlni/mqvyM2sm4SWKXb+5UGTnTOMnvBrqbU1ZzlKnQ94Z1V7UCOZe1926ox/iQNsyH0zkevlWLLDazbjlYNqcz2V/PamW3kEbfA/ucWXQ7qx+DvGPzqX4jHGrZH2JybpAw1GYFkDwDxAt4lP25anHLil3K5Y8kewHNcyM5LBc/4I1UfkAKnuXYg4X1Je0LBeQHPeRVrdrgpUUnyEx3NmpJ9wUk9Q07H+lV8t9S66XQmF5ZNs2mR/wCiZh/WpqL8kW490ZSfTt+aylTzW43/ADFOpeSNxfYf8Mm64jmtOGrIyQaSsjTXRJy7pzZIyO7OwHnWOe7G5Tl36foa01PbFdi++0zX10Lhoada4iubxTBCIzjkjAAYjwwDjPnWfBj3zLsk9kbFnshsux0FpsY7ad2G3cAF/ka52r/iepqPaMf6mrB8Gib8sYe1CXk4blUHqyDHqf8AirMct3qUI+EyGVbdHN+WF8BaUun8MaU4iMyTxGSRFIyWdi2T6DA+lbM87nJIz44/CmywzPZWztccrMy/FykfKPD8qqVtUWNpMK07VUu0eTYIDjr02zvUZY6HGdk80MUshcygE+QpK0htWIIdd0m4aOU3E0EyZK9pEw6ncdMd1WbWuCFpmJ9X0ZJWki1IKzb8vMMem42qS3VyJ12JoNVguozGZ4hGynLGcBh4AY2pOPcN3YpnHGq2FxqGizaZcrdvEXjnWH4yqEjBbHQZBpwbTFLkbcBcPR6bpNxdSRcs0zSFcrylV35Rj0rHklHJCcl2tI2QXtSjF/Rs5PxkQ3EuoOP/ADBj/aK6Xo7vQYn9Dn+pf+1NCbn+A/DvtXSvgw7eR5wZpC6vr8aPMYxFGXK5GHHQqc9xBrBrcjgkdDQYlkbXg6la8J2duySLJzyIgQMVG69RnPhmuXOW52dWMVDoB8S8H6drEB7aFUnUfBPGArKf5jypQk4uwnBTRx7VtOm0m+lsrpMSRnII2Dr3MPWuvinGULijj5oSjKmDxzFFDKuQTgnNaFNroZpY7dM2jLxlnViFLHoagsavcTlN9DZpnGzNn13p7IiTZr70RlSFyenwCo8LuSq+x2/2W6GNE4eN/fKEubwdq5bbsogMqpPplj6+VZM2RzdGmEFFHLeLdf8A7R6/PqCq5tx+7tlJ6Rg7HHnkn61twQ2R5RmzyuVJ9DrPs+hEPDNmoypMXPv4sSf5153G/c9Rzz8cHWnH29JjiJPa3c8umQQlhmSbp4gKf+Kv0C3+pZJ//KSKdW9uiivLLXwzcRpw1pSN2kLC3RMmMsDt5dBWvIvjZTF1FBk8Vikcna3UTu34ei57s+PpSt+A4rqKrO6hs3i7XUYlVWcvmQDmJxvipMUQ867oYJ57mF2zuwV9/sKhUidoW9ky9UIPmKtIIjeCNxiSFW8iuRSAiNnbDGYEHkBigKNVs4wxWJWTnGG7MkEjzqjU5vZxSyeEW4cW/Iolju5ZdPsWVzGqYI2OW38q5OVPSaHa+r4vw33N2KP4jU/CuF/Y+d72/Op3893KSkkzc7IAcJ5fTpXqNHjx4cMcUHaSo4mqc55ZTkuWyBmjwQXGGGK0tooSkP8A2dXVhDxGp1GR1lWMi3ABw7d4OPSuZr5fCkdTQRSk2jrsWrQynljfJ/ukEfrXMs6e3k3e+XBVlJPlvSbJKBTPaFNpEmlot3biW6kytvuVePpls9cdNu+tuhjKc+HwYtfKOOCtW2cqltnVSInyucgHqPrXTlBrpycmORP5jMMzKWiZTnqacJ09rFOF/Eh3o/DWp626Pbx9hb9GnmXC48h1P0qnPqYQ5vk0YNJOfbguGjezS2GoW0mo6l28COHkRIsK4G/KT4HpWR6ze+lGt6LYr6j/ANrmvvZaCmnWPOzX2VkeNfhSIYyCf8Wwx60Y5x3WVTxySZx+GRWG3f5g10454NHOnhmNdO13VtL20+/uIB4Bsr9jkflRswTbdK2NzzRVPsScQcRahrkEQ1Exs0RYrIqcpbOOuNu7uxVWHRYsGSWTH1l1J5NVPNGMJdEdU0/S4H061D9of3CZHOfCscpcs1KPASulWgGPd0PhnJqO4e0mj063Q/Dbxg+S0WFBIsxj+GP9posKOSW/GuuxjbUCfJkU/wAqsFQfD7QNaXdmtZP80P8AzSEGRe0W/A+Ozs39IyP50UBMfaEjz24urGKGBn5ZJI8kgeNZNdpp6jTyx4+po02aOLKpS6HR7W5tNRs+djGyleYhdxjuIPfWTTZYa7E8ORcrhp+S/Ljnpsm+L48lH4t4Btb2CW9ty8N2+/MvRj/iXp9RVcM+r9Lgoye/F+6JSx4NbLhbZ/syi6NwBrV7FcrJb+7LAeXM+SHb/CR3eYrqz9UwwxRniTnF91zX3+pjWhnKbUmov+oBJwzrul3sdylvdxzwH4JYou0Hrtnb1prV6HVJVlX9H+jD2dVgbahf25H2mazxFO4VLG4vCv4mTkAPk2AB6VRnWkxcyypfv+yNOLJqMnTGx8n9ppwBJYR27EfCXnDY+1c/JrtFH5ZuX2TNcIah9YpfmV7jrQdVsrSDUtVuFk52ESqqFAowTtnrXT9O1ayt41jlHi7ZztbhaW9zT+wNw1Z2muxRaQtj2ckaNLJeq55wT5YxjoMHwq3URzYcrzrJw/5ewtP7eaHtOH5ll0ngKwsbhZbxzeOOismE+o7/AL4qnJrcklSVGnFocUHbdlvt41jVQAAqnAA6Vl56muVLoSvNCsJAlCnP4j1PpRY0rKh7RNWEWhyWMtukvvS8iycwxG3UNjrmtOlg55OHRk1UlCHKs5OBIig8ocdzLXYSdeTitpvqEQTBsYbFTUYS7FcnOJPI2QM//tE4OPRhGak6aOln2jpDGI4dNQcoCjmYdAPSua4o2pugeT2l3pB7Kztk+uaKQ7YFN7R9YYYQwJ6Kf60UgAzx9rhOfeV+3/NPgXI+bgPQ5M9n73Cf8ExP5HNS2oVkB9nFn1h1S8U+EiI36AUqHZE/s6uB/B1aM/54D/I0h2Ktf4M1HStLnvZLu3mihAZgqsDjPn61ZidSIzjujwAcOcaXmiokDjt7MNnlzh09D3+h/KsfqHpENTP3sUnCf7P7mjSa+WJe3kjuidOi9omiGzWSS9j7RgOXmVsj1GOtYcc/UIJ48uLc/K6M0Sx6WTU4ZKXjuSwcfaEyci3loB3gy8n6iqlqNfjVPTcfRk5afTT5979Rra6vpd3EWWaF1I6hlYfcUpa3S5LjqMTi/rG/7D/C6iHOKdr7kVvqumR3DFXj8AAy9PvUMep0WH/Cwv77f+SctPqci+PIvtZLd8Q6ZCmWuIkGfxOq/nmrV6piXyYpN/7Sv8Bm/mmkvuUH2q67ZanpVhb2c8UnLclyI5A/RSN8eorp+m6qeeclLG40u5j1unjigmpXYp9lzkardrnH7jI89xWj1BfCmL09/G/sdHmnRTzHIJHWuUdYzFKso+BlOKkiEgO/u4Y0EPu7ySE5BRTkD6UMkjjnGepT6jrU6K0htYG5Vhk6qcb10NNiqO85mpy7pbRfZp2UbEE4Zs8vhXUwx2Lg5eaW5mzRxyMSp5X/AFqTinyhKTSphFlbzXdxBaR4M00qxpzHA3Pf5VHI6iOKW7gta8Caz+O4tF/1k/yrnUzbaSNxwFd9ZtRiH+WIn9TRtbFuN14Dh/6up3B/yIq/rmnsFvJRwTpYGDNeE+POP6UbER90uiSdKkASklIkSiXbrUaJAuqwLqGmXVk5wJ4mT6kbfnTXUD5+JIPKwwy7EeBrXdlDVGQN96aRGzYkAdadiowMtuq5pJvsOq6syVYdVVfpT57gmuxoTChyzAkVFyiurH8T4Rk3KkAKQBjvFReVWSWN0E2WtXWnTNcWMwSUqRv0I7xVGdrLGi7C3iluRbeGOONTvLxLO+tjMZDsYIjlR4nH61gyaaUeh0cWqjK1IvBgvJIWngBhVWxlzjB8x1qucPbjum0kWQzLJLbFWwy24cvppS9zqEYDj4jH1I9aqyYc81eJqvPJKOqwQ+eLvwcj450s6XxFfQRt8jhgfEEA129PCUcEU3bXc42acZZm0uGKLRu0QY6k9POtmOVoyZVTJJUIwcb1JojF9htwYnacVaaPCQt9lJqjI/hZbj6nYneshoBZXpkWCu9SIkJk3pgFkkEYqIEqufGkSslVjSJGeY5HrSA4pxrbR2XE9/DbjCc/Pjzbc/nVkZOgkhF2r+NP3GGxGTKw32pe5INiPLPI5wTj0o9yTDZFGHc8oLfEfOk3YJEDzsBsFH0qpyZYoo0Ll8c29JO+pOkuhuQPh2FSohY9tiw4VlKuym4vzDKR1ZFi5gvpk0Qk5OmNqlaGGi6xqNhwtqdvaXcscUU9u6KG+XmJyB5HwpZNPjzfw8itMniyzx/HF00dL4R4iv7zQba6l7MSyAliq7HfHTNeX1usyemyenwVtXnk72DR4tYlmy9Ske0eRp+KJXkxloIycDyxXpPQtRk1Oj9zJ1OB6pghgzqMPBULZikhA6DJrpLjoYpK1Zv2jN1NT3Mr2otHs6RW4kyRukDlfI7Cqc3ylmPqdPcms6LWCTMaYmCuxxUiJHTA/9k=' }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                      }}
                    />
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",
                      width: "50%",
                      textAlign: "right",
                    }} numberOfLines={1}>{item.Name}</Text>


                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Specialties</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Specialty}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Phone Number</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Phone_Number}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>ID Number</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.ID_Number}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Address</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Address}</Text>
                  </View>
                  {/* Price */}
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    {/* Price */}

                  </View>

                  <View style={{
                    width: "100%",
                    height: 45,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Button
                      title={"Cancel"}
                      buttonStyle={{
                        width: "48%",
                        height: "100%",
                      }}
                      color={'red'}
                      onPress={cancel}
                    />
                    <Button
                      title={"Done"}
                      buttonStyle={{
                        width: "48%",
                        height: "100%",
                      }}
                      color={'green'}
                      onPress={() => SendReq(item)}
                    />

                  </View>
                </View>
              )
            }} />
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }, flatListContent: {
    flexGrow: 1, // Make the content take all available space
  },
  TouchContainer: {
    backgroundColor: 'white',
    borderWidth: 2,

    borderRadius: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
    borderColor: 'white',
  },
  BottomCard: {
    backgroundColor: 'white',
    width: '100%',
    paddingRight: 10,
    paddingBottom: (250),
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  mechanicItem: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  mechanicImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },

  mechanicDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fffff',
    width: "100%",
    height: "100%",
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sideBtnStyle: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: "10%",
    right: 15,

    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  flatListView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "39%",
    // backgroundColor: "red",
  },
  tabViewStyle: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mechanicName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  mechanicPhoneNumber: {
    color: 'blue',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },

  mechanicEmail: {
    marginBottom: 5,
  },

  mechanicShopDetails: {
    color: '#888',
  },

  input: {
    color: 'grey',
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    color: 'white',
  },
})

export default Locations;