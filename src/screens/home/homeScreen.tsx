// HomeScreen.tsx
import {View} from 'react-native';
import { globalStyles } from '../../config/theme/theme';
import { Title } from '../../presentation/components/ui/Title';
import {ScrollView} from 'react-native-gesture-handler';
import { ContactItem } from '../../presentation/components/ui/ContactItem';
import { ContactsList } from '../../config/constants/ContactsList';
import { sortContacts } from '../../config/utils/sortContacts';

export const HomeScreen = () => {
  const sortedContacts = sortContacts(ContactsList);
  
  return (
    <View style={[globalStyles.mainContainer]}>
      <View style={globalStyles.globalMargin}>
        <ScrollView>
          <Title text="Contactos" safe />
          {sortedContacts.map((contact, index) => (
            <ContactItem
              key={index} // Añadir una key única
              {...contact} // Asegúrate de que el objeto de contacto tiene todas las propiedades necesarias
              isFirst={index === 0}
              isLast={index === sortedContacts.length - 1}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

