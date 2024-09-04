import axios from 'axios';
import {RegisterDto} from '../../shared/dto/register.dto';
import {generateApiLink} from '../../shared/utils/generateApiLink';
import {MedicationDto} from '../../shared/dto/medication.dto';
import {getToken} from '../../shared/utils/getToken';

const ROUTE = 'medications/';

export const addMedicationApi = async (
  addMedication: Omit<MedicationDto, 'id'>,
) => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${generateApiLink(ROUTE)}`,
      addMedication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Add medication Failed');
  }
};

export const setAmountApi = async (medication: MedicationDto) => {
  try {
    const token = await getToken();
    const response = await axios.put(
      `${generateApiLink(ROUTE)}${medication.id}`,
      medication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Set Number Failed');
  }
};

export const getUserMedicationApi = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${generateApiLink(ROUTE)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Set Number Failed');
  }
};
