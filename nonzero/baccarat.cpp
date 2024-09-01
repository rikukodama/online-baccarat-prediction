#include <iostream>
#include <fstream>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

using namespace std;


int comparehands(int player_total, int banker_total){

    //0 represents that a player has won
    if(player_total > banker_total){
        return 0;
    }
    //1 represents that a banker has won
    else if(player_total < banker_total){
        return 1;
    }
    //this represents that a tie has occured and should be considered a player win since banker charges a 5% tax
    else{
        return 0;
    }
}

void getcount(int card, int card_count[]){
    if(card == 1 || card == 2  || card == 3){
        card_count[0] += 1;
    }
    else if(card == 4){
        card_count[0] += 2;
    }
    else if(card == 5 || card == 7 || card == 8){
        card_count[0] -= 1;
    }
    else if(card == 6){
        card_count[0] -= 2;
    }

    switch(card){
        case 10:
            card_count[1] += 188;
            card_count[2] -= 178;
            card_count[3] += 5129;
            break;
        case 1:
            card_count[1] += 440;
            card_count[2] -= 448;
            card_count[3] += 1293;
            break;
        case 2:
            card_count[1] += 522;
            card_count[2] -= 543;
            card_count[3] -= 2392;
            break;
        case 3:
            card_count[1] += 649;
            card_count[2] -= 672;
            card_count[3] -= 2141;
            break;
        case 4:
            card_count[1] += 1157;
            card_count[2] -= 1195;
            card_count[3] -= 2924;
            break;
        case 5:
            card_count[1] -= 827;
            card_count[2] += 841;
            card_count[3] -= 2644;
            break;
        case 6:
            card_count[1] -= 1132;
            card_count[2] += 1128;
            card_count[3] -= 11595;
            break;
        case 7:
            card_count[1] -= 827;
            card_count[2] += 817;
            card_count[3] -= 10914;
            break;
        case 8:
            card_count[1] -= 502;
            card_count[2] += 533;
            card_count[3] += 6543;
            break;
        case 9:
            card_count[1] -= 231;
            card_count[2] += 249;
            card_count[3] += 4260;
            break;
        default:
            break;

    }
}


int playhand(int &top_of_deck, int shoe[], int card_count[]){
    //this value doesn't need to be initialized
    //as its value will always be set when drawn
    int third_card_value;

    int player_total = 0;
    int banker_total = 0;
    //Both players draw their first card
    player_total += shoe[top_of_deck];
    getcount(shoe[top_of_deck], card_count);
    top_of_deck++;

    banker_total += shoe[top_of_deck];
    getcount(shoe[top_of_deck], card_count);
    top_of_deck++;

    //Both players draw their second card
    player_total += shoe[top_of_deck];
    getcount(shoe[top_of_deck], card_count);
    top_of_deck++;

    banker_total += shoe[top_of_deck+3];
    getcount(shoe[top_of_deck], card_count);
    top_of_deck++;

    //in baccarat you only care abou the right digit
    player_total = player_total%10;
    banker_total = banker_total%10;

    //since 4 cards have been drawn the top of deck has been moved by plus 4

    //If either player has a 8 or 9 then they have a natural and it is over
    if(player_total == 8 || player_total == 9 || banker_total == 8 || banker_total == 9){
        //no need for a third card for either hand and the hands need to be compared
        //no need to mod 10 here because there was no change in card totals
        return comparehands(player_total, banker_total);
    }

    //player does not draw a card when their total is 6 or 7
    if(player_total > 5){
        //banker does not draw for 6 or 7 when the player stands with 6 or 7
        if(banker_total > 5){
            //no need for a third card for either hand and the cards need to be compared
            //no need to mod 10 here because there was no change in card totals
            return comparehands(player_total, banker_total);
        }
        else{
            //since we already incremented top_of_deck before here
            //we simply just need to take the card off the top
            banker_total += shoe[top_of_deck];
            //and increment it for the number of cards drawn which will be 1
            getcount(shoe[top_of_deck], card_count);
            top_of_deck += 1;
            //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
            banker_total = banker_total%10;
            //then once the final totals are added and modded it is sent to see who won that hand
            return comparehands(player_total, banker_total);
        }
    }
    //if the players first two cards add up and mod 10 below 5 then they must draw another card
    else{

        //since we already incremented top_of_deck before here
        //we simply just need to take the card off the top
        player_total += shoe[top_of_deck];
        third_card_value = shoe[top_of_deck];
        //and increment it for the number of cards drawn which will be 1
        getcount(shoe[top_of_deck], card_count);
        top_of_deck += 1;
        //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
        player_total = player_total%10;

        //however the banker can draw a third card based one what they currently have AND the third card drawn by player

        //The banker will never draw a card when their total is 7 and a third card is drawn by the player
        if(banker_total == 7){
            //we don't need to recalculate the banker_total or draw a card
            //so we just compare hands
            return comparehands(player_total, banker_total);
        }
        //if the banker hand totals to 6 with the first 2 cards, then they might have to draw
        else if(banker_total == 6){
            //if the third card value is either 6 or 7 then the banker needs to draw
            if(third_card_value == 6 || third_card_value == 7){
                //since we already incremented top_of_deck before here
                //we simply just need to take the card off the top
                banker_total += shoe[top_of_deck];
                //and increment it for the number of cards drawn which will be 1
                getcount(shoe[top_of_deck], card_count);
                top_of_deck += 1;
                //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
                banker_total = banker_total%10;
                //now the totals are tallied and there will not be a card drawn for either hands
                //so they just need to compare hands and determine a winner
                return comparehands(player_total, banker_total);
            }
            else{
                //since the third card wasn't a 6 or 7 then the banker doesn't need to draw and the hands
                //just need to be compared
                return comparehands(player_total, banker_total);
            }

        }
        //if the banker hand totals to 5 with the first 2 cards then they might have to draw
        else if(banker_total == 5){
            //if the third card value is either 4,5,6,or 7 then the banker has to draw
            if(third_card_value == 4 || third_card_value == 5 || third_card_value == 6 || third_card_value == 7){
                //since we already incremented top_of_deck before here
                //we simply just need to take the card off the top
                banker_total += shoe[top_of_deck];
                //and increment it for the number of cards drawn which will be 1
                getcount(shoe[top_of_deck], card_count);
                top_of_deck += 1;
                //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
                banker_total = banker_total%10;
                //now the totals are tallied and there will not be a card drawn for either hands
                //so they just need to compare hands and determine a winner
                return comparehands(player_total, banker_total);
            }
            else{
                //since the third card wasn't a 4,5,6 or 7 then the banker doesn't need to draw and the hands
                //just need to be compared
                return comparehands(player_total, banker_total);
            }

        }
        // if the banker hand totals to 4, with the first 2 cards then they might have to draw
        else if(banker_total == 4){
            //if the third card value is either 2,3,4,5,6, or 7 then the banker has to draw
            if(third_card_value == 2 || third_card_value == 3 || third_card_value == 4 || third_card_value == 5 || third_card_value == 6 || third_card_value == 7){
                //since we already incremented top_of_deck before here
                //we simply just need to take the card off the top
                banker_total += shoe[top_of_deck];
                //and increment it for the number of cards drawn which will be 1
                getcount(shoe[top_of_deck], card_count);
                top_of_deck += 1;
                //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
                banker_total = banker_total%10;
                //now the totals are tallied and there will not be a card drawn for either hands
                //so they just need to compare hands and determine a winner
                return comparehands(player_total, banker_total);
            }
            else{
                //since the third card wasn't a 2,3,4,5,6 or 7 then the banker doesn't need to draw and the hands
                //just need to be compared
                return comparehands(player_total, banker_total);
            }

        }
        //if the banker hand totals to 3 in the first 2 cards they might have to draw
        else if(banker_total == 3){
            //the banker does not draw when the third card for the player is an 8
            if(third_card_value != 8){
                //since we already incremented top_of_deck before here
                //we simply just need to take the card off the top
                banker_total += shoe[top_of_deck];
                //and increment it for the number of cards drawn which will be 1
                getcount(shoe[top_of_deck], card_count);
                top_of_deck += 1;
                //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
                banker_total = banker_total%10;
                //now the totals are tallied and there will not be a card drawn for either hands
                //so they just need to compare hands and determine a winner
                return comparehands(player_total, banker_total);
            }
            else{
                //since the third card was an 8 then the banker doesn't need to draw and the hands
                //just need to be compared
                return comparehands(player_total, banker_total);
            }
        }
        //if the bankers first 2 card totals are either 0,1,2 then the banker HAS TO DRAW regardless of what the third card was
        else{
                //since we already incremented top_of_deck before here
                //we simply just need to take the card off the top
                banker_total += shoe[top_of_deck];
                //and increment it for the number of cards drawn which will be 1
                getcount(shoe[top_of_deck], card_count);
                top_of_deck += 1;
                //here we need to get the new total because it could have exceeded 10 and we only care about the right digit
                banker_total = banker_total%10;
                //now the totals are tallied and there will not be a card drawn for either hands
                //so they just need to compare hands and determine a winner
                return comparehands(player_total, banker_total);

        }
    }

}

int sumofarray(int *myarray, int size){
    int total = 0;
    for(int i = 0; i < size; i++){
        total += myarray[i];
    }
    return total;
}

int main(){
    srand(time(NULL));

    //shoe consists of 8 decks that have been shuffled through a python script
    //
    int *shoe = new int[416];
    int sixtrack[6][15] = {0};
    //the card that signifies the end of the shoe
    int red_card;

    //this will be the index of where the top of the deck is, instead of constantly shifting the array.
    int top_of_deck;

    //Shoe is set with correct deck
    ifstream deck_file("deck_file");

    ofstream train;
    train.open("trainingdata.txt", ios::app);

    ofstream testBanker;
    testBanker.open("testingdataBanker.txt", ios::app);

    ofstream testPlayer;
    testPlayer.open("testingdataPlayer.txt", ios::app);


    int bank5[5] = {0};
    int bank10[10] = {0};
    int bank20[20] = {0};
    int bank30[30] = {0};

    int streak = 0;

    int card_count[10] = {0};

    int last_winner = 1;


    //Get the shoe information from the deck file
    for(int i = 0; i < 416; i++){
        deck_file >> shoe[i];
    }

    //Randomize when the red card will occur it should occur around one deck from the end of the game
    red_card = rand()%52+52;

    //The way casinos work is that they reveal the very first card and burn that many cards AND the card drawn
    top_of_deck = shoe[0] + 1;
    //this while loop will play the game of baccarat
    int count = 0;
    while(top_of_deck < 416-red_card){

        //cout << "HAND NUMBER: " << count << endl;
        //cout << "NUM TIMES BANK WON IN LAST 5:  " << sumofarray(bank5, 5) << endl;
        //cout << "NUM TIMES BANK WON IN LAST 10: " << sumofarray(bank10, 10) << endl;
        //cout << "NUM TIMES BANK WON IN LAST 20: " << sumofarray(bank20, 20) << endl;
        //cout << "NUM TIMES BANK WON IN LAST 30: " << sumofarray(bank30, 30) << endl;
        //cout << "LAST WINNER: " << last_winner << endl;
        //cout << "CARD COUNT: " << card_count[0] << endl;
        //cout << "STREAK: " << streak << endl;
        int a, b, c, d, e, f, g, j, k, m;
        float h, a2, b2, c2, d2;
        float a3, b3, c3, d3, h2;
        if(count > 30){
            //train << sumofarray(bank5, 5) << " " << sumofarray(bank10, 10) << " " << sumofarray(bank20, 20) << " " << sumofarray(bank30, 30) << " " << last_winner << " " << card_count[0] << " " << streak << " ";
            a = sumofarray(bank5, 5);
            a2 = (float)a/5;
            a3 = pow(a2, 2);
            b = sumofarray(bank10, 10);
            b2 = (float)b/10;
            b3 = pow(b2, 2);
            c = sumofarray(bank20, 20);
            c2 = (float)c/20;
            c3 = pow(c2, 2);
            d = sumofarray(bank30, 30);
            d2 = (float)d/30;
            d3 = pow(d2, 2);
            e = last_winner;
            f = card_count[0];
            k = card_count[1];
            m = card_count[2];
            g = streak;
            j = sumofarray(sixtrack[count%6], (count/6) + 1);
            h = (float)j/((count/6)+1);
            h2 = pow(h, 2);

        }

        int result = playhand(top_of_deck, shoe, card_count);

        sixtrack[count%6][count/6] = result;
        //cout << "WINNER: " << result <<  endl;
        if(count > 30){
            /*
            if(result == 0){
                testPlayer << a << " " << a2 << " " << a3 << " " <<
                    b << " " << b2 << " " << b3 << " " <<
                    c << " " << c2 << " " << c3 << " " <<
                    d << " " << d2 << " " << d3 << " " <<
                    e << " " << f << " " << k << " " << m << " " << g << " " << h << " " << h2 << " " << result << endl;
            }
            else{
                testBanker << a << " " << a2 << " " << a3 << " " <<
                    b << " " << b2 << " " << b3 << " " <<
                    c << " " << c2 << " " << c3 << " " <<
                    d << " " << d2 << " " << d3 << " " <<
                    e << " " << f << " " << k << " " << m << " " << g << " " << h << " " << h2 << " " << result << endl;
            }
            */

            train << a << " " << a2 << " " << a3 << " " <<
                b << " " << b2 << " " << b3 << " " <<
                c << " " << c2 << " " << c3 << " " <<
                d << " " << d2 << " " << d3 << " " <<
                e << " " << f << " " << k << " " << m << " " << g << " " << h << " " << h2 << " " << result << endl;

        }

        if(last_winner == result){
            streak++;
        }
        else{
            streak = 1;
        }

        last_winner = result;


        if(result == 1){
            bank5[count%5] = 1;
            bank10[count%10] = 1;
            bank20[count%20] = 1;
            bank30[count%30] = 1;
        }
        else{
            bank5[count%5] = 0;
            bank10[count%10] = 0;
            bank20[count%20] = 0;
            bank30[count%30] = 0;
        }
        count++;
    }






    return 0;
}
