import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import '@reach/combobox/styles.css';

import styles from '@/styles/atoms/Input/Input.module.css';

import { PlacePhotos } from '@/components/molecules';

interface ISearchBoxProps {
  onSelectAddress: (address: string, latitude: number | null, longitude: number | null) => void;
  defaultValue: string;
  address?: string;
}

type PhotoUrls = string[];

const libraries: Libraries = ['places'];

export const SearchBox = ({ onSelectAddress, defaultValue, address }: ISearchBoxProps) => {
  const [photoUrls, setPhotoUrls] = useState<PhotoUrls>([]);
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    libraries
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
      onFetchPlaceDetails={setPhotoUrls}
    >
      {/* Render place photos if available for the selected address, or a message to add photos if no photos are available */}
      {address && photoUrls.length ? (
        <PlacePhotos address={address} photoUrls={photoUrls} />
      ) : address ? (
        /*  <div className="flex h-full w-[200px] items-center justify-around bg-primary-LIGHT">
          Add your photo
        </div> */ <></>
      ) : (
        <></>
      )}
    </ReadySearchBox>
  );
};

const ReadySearchBox = ({
  onSelectAddress,
  defaultValue,
  onFetchPlaceDetails,
  children
}: React.PropsWithChildren<
  ISearchBoxProps & {
    onFetchPlaceDetails: (url: string[]) => void;
  }
>) => {
  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      onSelectAddress('', null, null);
      onFetchPlaceDetails([]);
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address, lat, lng);

      const placeId = results[0].place_id;
      const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '';
      const cors =
        process.env.NODE_ENV === 'development' ? 'https://cors-anywhere.herokuapp.com/' : '';

      if (process.env.NODE_ENV === 'development') {
        onFetchPlaceDetails(['/pic1.jpg', '/pic2.jpg', '/pic3.jpg']);
      } else {
        const url = `${cors}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;

        axios
          .get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          })
          .then((response) => {
            const data = response.data;
            if (data.result && data.result.photos && data.result.photos.length > 0) {
              const numberOfPhotos = data.result.photos.length;
              const photoArr =
                numberOfPhotos >= 3 ? data.result.photos.slice(0, 3) : data.result.photos;
              // create an array of photo urls
              const photoUrls = photoArr.map((photo: { photo_reference: string }) => {
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
              });
              onFetchPlaceDetails(photoUrls);
            } else {
              onFetchPlaceDetails([]);
            }
          })
          .catch((error) => {
            console.error(`Error fetching place details: ${error}`);
          });
      }
    } catch (error) {
      console.error(`Error geocoding address: ${error}`);
    }
  };

  return (
    <>
      <div className={styles.fieldWrapper}>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            onChange={handleChange}
            disabled={!ready}
            placeholder="Search your location"
            autoComplete="off"
            className={styles.input}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      {children}
    </>
  );
};
