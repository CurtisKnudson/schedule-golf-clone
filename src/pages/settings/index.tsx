import { ComponentHeader } from 'components/componentHeader';
import { SettingsItem } from 'pages/settings/components/settingsItem';
import { ForeUpConfig } from 'pages/settings/components/foreUpConfig';

export const Settings = () => {
  return (
    <div>
      <ComponentHeader header="Settings" />
      <div className=" rounded shadow-sm bg-gray-50 mt-8 p-2 center-all w-full flex flex-col">
        <SettingsItem
          name="Foreup"
          description="Configure your ForeUp login"
          element={<ForeUpConfig />}
        />
      </div>
    </div>
  );
};
