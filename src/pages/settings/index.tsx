import { ComponentHeader } from 'components/componentHeader';
import { SettingsItem } from 'pages/settings/components/settingsItem';

export const Settings = () => {
  return (
    <div>
      <ComponentHeader header="Settings" />
      <div className=" rounded shadow-sm bg-gray-50 mt-8 p-2">
        <SettingsItem name="Foreup" description="Configure your ForeUp login" />
      </div>
    </div>
  );
};
