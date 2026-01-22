import React, { useEffect, useState } from 'react';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import DeviceSelectionScreenFromToken from './DeviceSelectionScreen/DeviceSelectionScreenFromToken';

export default function PreJoinScreensDeviceLanding() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { Token } = useParams<{ Token?: string }>();

  const [name, setName] = useState<string>(user?.displayName || '');
  const [roomName] = useState<string>('');

  const [mediaError, setMediaError] = useState<Error>();

  useEffect(() => {
    if (Token) {
      setName('test');
    }
  }, [Token]);

  useEffect(() => {
    if (!mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, mediaError]);

  return (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      <DeviceSelectionScreenFromToken name={name} roomName={roomName} token={Token || ''} />
    </IntroContainer>
  );
}
