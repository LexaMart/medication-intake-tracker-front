import axios from 'axios';
import {RegisterDto} from '../../shared/dto/register.dto';
import {generateApiLink} from '../../shared/utils/generateApiLink';
import {MedicationDto} from '../../shared/dto/medication.dto';

const ROUTE = 'medications/';

export const addMedicationApi = async (
  addMedication: Omit<MedicationDto, 'id'>,
  userId: string,
) => {
  try {
    const response = await axios.post(`${generateApiLink(ROUTE)}`, {
      ...addMedication,
      userId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Add medication Failed');
  }
};

export const setAmountApi = async (medication: MedicationDto) => {
  try {
    const response = await axios.put(
      `${generateApiLink(ROUTE)}${medication.id}`,
      {
        ...medication,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Set Number Failed');
  }
};

export const getUserMedicationApi = async (customerId: string) => {
  try {
    const response = await axios.get(
      `${generateApiLink(ROUTE)}user/${customerId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Set Number Failed');
  }
};
