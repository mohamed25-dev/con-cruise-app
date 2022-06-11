#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';
import { Command } from './command.interface';

import { MatchService } from '../match/match.service';
import { ScoreService } from '../score/score.service';
import { DriversService } from '../drivers/drivers.service';
import { CustomersService } from '../customers/customers.service';

const matchService = new MatchService(
  new CustomersService(),
  new ScoreService(),
  new DriversService(),
);

const getCommand = async () => {
  const answers = await inquirer.prompt({
    name: 'command',
    type: 'list',
    message: 'please enter a command',
    choices: () => commands.map((c) => `${c.name}`),
  });

  for (const command of commands) {
    if (answers.command === command.name) {
      await command.action();
    }
  }

  await getCommand();
};

const printMatchResToCli = async () => {
  const customersService = new CustomersService();
  const driversService = new DriversService();

  const { matchedPairs, unMatchedCustomers, idleDrivers } =
    await matchService.match();

  const customers = await customersService.findAll();
  const drivers = await driversService.findAll();

  matchedPairs.forEach(([c, d]) => {
    console.log(
      `${customers[c].id} ${customers[c].name} is matched to ${drivers[d].id} ${drivers[d].name}`,
    );
  });

  console.log('---------------------------------------');
  console.log();

  console.log(chalk.yellow('----- failed fulfilment customers -----'));
  if (unMatchedCustomers.length === 0) {
    console.log(chalk.green('***** All customers are matched :) *****'));
  } else {
    unMatchedCustomers.forEach((c) =>
      console.log(chalk.red(`${c.id} - ${c.name}`)),
    );
  }

  console.log(chalk.yellow('------------------------------'));
  console.log();

  console.log(chalk.yellow('------ idle drivers ---------'));

  if (idleDrivers.length === 0) {
    console.log(chalk.green('***** All drivers are busy now :) *****'));
  } else {
    idleDrivers.forEach((d) => console.log(chalk.red(`${d.id} - ${d.name}`)));
  }

  console.log(chalk.yellow('------------------------------'));
};

const printCustomersToCli = async () => {
  const customersService = new CustomersService();
  const customers = await customersService.findAll();

  for (const customer of customers) {
    console.log(`${customer.id} - ${customer.name}`);
  }
};

const printCruisersToCli = async () => {
  const driversService = new DriversService();
  const drivers = await driversService.findAll();

  for (const driver of drivers) {
    console.log(`${driver.id} - ${driver.name}`);
  }
};

const commands: Array<Command> = [
  {
    name: 'manual',
    description: 'print help menu',
    action: () => {
      commands.map((command) => {
        console.log(chalk.yellow(command.name));
        console.log(chalk.blue(command.description));
        console.log('---------------------------------------------');
      });
    },
  },
  {
    name: 'match',
    description: 'matches customers to drivers',
    action: printMatchResToCli,
  },
  {
    name: 'customer',
    description: 'print customers list',
    action: printCustomersToCli,
  },
  {
    name: 'cruiser',
    description: 'print cruisers list',
    action: printCruisersToCli,
  },
  {
    name: 'exit',
    description: 'exits the app',
    action: async () => {
      try {
        await axios.get('http://localhost:3000/shutdown');
        console.log(chalk.green('Done'));
      } catch (error) {
        console.log(
          chalk.red('Something went wrong while communicating to the server'),
        );
      } finally {
        console.log(chalk.green('**** Bye ****'));
        process.exit(1);
      }
    },
  },
];

getCommand();
