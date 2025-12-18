import { StatusBar, Text, View } from 'react-native';

interface TabHeaderProps {
  title: string;
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

/**
 * Reusable TabHeader Component with NativeWind
 *
 * @param {string} title - The main title text
 * @param {ReactNode} children - Any child elements to render below the title
 * @param {string} bgColor - Header background color class (default: 'bg-indigo-500')
 * @param {string} textColor - Title text color class (default: 'text-white')
 */
const TabHeader = ({
  title,
  children,
  bgColor = 'bg-background',
  textColor = 'text-slate-900',
}: TabHeaderProps) => {
  return (
    <View
      className={`px-4 pb-4 pt-3 ${bgColor} border border-b border-l-0 border-r-0 border-t-0 border-muted`}
    >
      <StatusBar barStyle="light-content" />
      <Text className={`text-2xl font-bold ${textColor}`}>{title}</Text>
      {children && <View className="mt-2">{children}</View>}
    </View>
  );
};

export default TabHeader;
