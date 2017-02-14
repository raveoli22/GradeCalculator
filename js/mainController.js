app.controller('MainController', ['$scope', function ($scope) {
    
    $scope.gradeSoFar = 0; //grade so far from input out of 100
    $scope.gradeNeeded = 0; //grade needed to reach target
    $scope.weightSoFar = 0; //weight so far from input
    $scope.gradeSoFarAssignment = 0; //grade so far from input out of entered grades
    $scope.weightLeft = 0; //percentage left until full grade
    
    $scope.targetholder = 0;
    
    
    $scope.gradeA = [];
    $scope.weightA = [];
    
    $scope.Assignment = {
        
        assignmentData: [
            {grade : null, weight : null},      
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null},
            {grade : null, weight : null}
        ]
    };
    $scope.addRow = function () {
        var newAssn = {grade: '',weight: ''};
        $scope.Assignment.assignmentData.push(newAssn);
    };
    $scope.calcCurrent = function () {
        
        var correct = false; //boolean used to determine the correctness of inputs
        //==========================================================================================================================================//
        //==========================================================================================================================================//
        //Checks for blank inputs/non-numerical inputs are not allowed==============================================================================// 
        //==========================================================================================================================================//
        //==========================================================================================================================================//
        for (var i = 0; i < $scope.Assignment.assignmentData.length; i++) { 
            
            if ($scope.Assignment.assignmentData[i].grade === '') { 
                $scope.Assignment.assignmentData[i].grade = null;
            }
            if ($scope.Assignment.assignmentData[i].weight === '') {
                $scope.Assignment.assignmentData[i].weight = null;
            }
            if ($scope.Assignment.assignmentData[i].grade !== null && $scope.Assignment.assignmentData[i].weight !== null) {
                $scope.gradeA.push($scope.Assignment.assignmentData[i].grade);
                $scope.weightA.push($scope.Assignment.assignmentData[i].weight);
                correct = true;
            } else if (($scope.Assignment.assignmentData[i].grade === null && $scope.Assignment.assignmentData[i].weight !== null) || ($scope.Assignment.assignmentData[i].grade !== null && $scope.Assignment.assignmentData[i].weight === null)) {     //check for uneven empty fields
                correct = false;
                $scope.gradeA = [];
                $scope.weightA = [];
                alert("Something is wrong with your input");
                break;                         //breaks out of loop is discrepancy is detected
            }
        }
        //==========================================================================================================================================//
        //==========================================================================================================================================//
        //Calculations for User's Grade=============================================================================================================// 
        //==========================================================================================================================================//
        //==========================================================================================================================================//
        console.log($scope.gradeA);
        console.log($scope.weightA);
        
        var totalWeight = 0;
        var x = 0; 
        
        for (var i = 0; i < $scope.weightA.length; i++){
            totalWeight = totalWeight + $scope.weightA[i];
        }
        
        if (totalWeight > 100){
            correct = false;
        } else {
            correct = true; 
            $scope.weightSoFar = totalWeight;
        }
        
        $scope.weightLeft = 100-$scope.weightSoFar;
        
        
        
        
        if (correct){
            var temp = 0;
            var total = 0; 
            var temp2 = 0; 
            var total2 = 0; 
            var c_weight = [];
            
            for (var i = 0; i < $scope.gradeA.length; i++){
                temp = $scope.gradeA[i] * ($scope.weightA[i]/100);
                c_weight[i] = $scope.weightA[i] / $scope.weightSoFar;
                total = total + temp;
            }
            $scope.gradeSoFar = total; 
            
            
            for (var i = 0; i < $scope.gradeA.length; i++){
                temp2 = $scope.gradeA[i]*c_weight[i];
                total2 = total2+temp2;
            }
            
            $scope.gradeNeeded = ($scope.target - $scope.gradeSoFar)/($scope.weightLeft/100);  
            
            $scope.gradeSoFarAssignment = total2; 

            if ($scope.weightSoFar === 100){
                $scope.gradeNeeded = 0;
            }
            
            $scope.targetholder = $scope.target;
            
            console.log(total);
            console.log($scope.Assignment.assignmentData);
        }
        else {
            alert("Something is wrong with your input");
            console.log($scope.Assignment.assignmentData);
        }

        $scope.gradeA = []; //restting the grade array
        $scope.weightA = []; //resetting the weight array
    };
    
    
}]);