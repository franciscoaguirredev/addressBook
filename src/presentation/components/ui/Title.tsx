import {Text, View} from 'react-native';
import {colors, globalStyles} from '../../../config/theme/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  text: string;
  safe?: boolean;
  white?: boolean;
}

export const Title = ({text, safe = false, white = false}: Props) => {
  const {top} = useSafeAreaInsets();

  return (
    <View>
      <Text
        style={{
          ...globalStyles.title,
          marginTop: 10,
          marginBottom: 10,
          color: 'white',
          textAlign: 'center'
        }}>
        {text}
      </Text>
    </View>
  );
};
