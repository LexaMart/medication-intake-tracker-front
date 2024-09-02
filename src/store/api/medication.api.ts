import axios from 'axios';
import {RegisterDto} from '../../shared/dto/register.dto';
import {generateApiLink} from '../../shared/utils/generateApiLink';
import {MedicationDto} from '../../shared/dto/medication.dto';

const ROUTE = 'medication/';

export const addMedicationApi = async (addMedication: MedicationDto) => {
  try {
    const response = await axios.post(
      `${generateApiLink(ROUTE)}add`,
      addMedication,
    );
    console.log('here');

    return response.data;
  } catch (error) {
    console.log('here err', error);

    throw new Error('Add medication Failed');
  }
};

export const setAmountApi = async (amount: number, id: number) => {
  try {
    const response = await axios.post(`${generateApiLink(ROUTE)}amount`, {
      amount,
      id,
    });
    console.log('here');

    return response.data;
  } catch (error) {
    console.log('here err', error);

    throw new Error('Set Number Failed');
  }
};
